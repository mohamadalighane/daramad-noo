import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'
import Purchase from '@/models/Purchase'

// Rate limiting (simple in-memory)
const rateLimit = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const requests = rateLimit.get(ip) || []
  const recent = requests.filter(t => now - t < 60000) // 1 minute
  if (recent.length >= 5) return false
  recent.push(now)
  rateLimit.set(ip, recent)
  return true
}

export async function POST(req) {
  try {
    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'درخواست‌های زیاد — کمی صبر کنید' }, { status: 429 })
    }

    const body = await req.json()
    const { articleId, email, phone, telegram } = body

    // Validation
    if (!articleId || !email) {
      return NextResponse.json({ error: 'اطلاعات ناقص است' }, { status: 400 })
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: 'ایمیل نامعتبر است' }, { status: 400 })
    }

    await connectDB()
    const article = await Article.findById(articleId)
    if (!article || !article.isPublished) {
      return NextResponse.json({ error: 'مقاله یافت نشد' }, { status: 404 })
    }

    // Free article
    if (article.isFree) {
      return NextResponse.json({ url: article.fileUrl })
    }

    // Create pending purchase
    const purchase = new Purchase({
      articleId: article._id,
      articleTitle: article.title,
      buyerEmail: email.toLowerCase().trim(),
      buyerPhone: phone || '',
      buyerTelegram: telegram || '',
      amount: article.price,
      status: 'pending',
    })
    await purchase.save()

    // ZarinPal payment request
    const zarinpalRes = await fetch('https://api.zarinpal.com/pg/v4/payment/request.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: article.price * 10, // ریال
        currency: 'IRT',
        description: `خرید مقاله: ${article.title}`,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/verify?purchaseId=${purchase._id}`,
        metadata: { email, mobile: phone || '' },
      }),
    })

    const zarinpalData = await zarinpalRes.json()

    if (zarinpalData.data?.code === 100) {
      const authority = zarinpalData.data.authority
      await Purchase.findByIdAndUpdate(purchase._id, { authority })
      return NextResponse.json({
        url: `https://www.zarinpal.com/pg/StartPay/${authority}`,
      })
    } else {
      await Purchase.findByIdAndDelete(purchase._id)
      return NextResponse.json({
        error: 'خطا در اتصال به درگاه پرداخت — دوباره امتحان کنید',
      }, { status: 502 })
    }
  } catch (e) {
    console.error('Payment error:', e)
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 })
  }
}
