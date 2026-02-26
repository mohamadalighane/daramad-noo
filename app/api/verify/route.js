import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import connectDB from '@/lib/mongodb'
import Purchase from '@/models/Purchase'
import Article from '@/models/Article'
import { sendTelegramFile, sendTelegramNotification } from '@/lib/telegram'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const purchaseId = searchParams.get('purchaseId')
    const authority = searchParams.get('Authority')
    const status = searchParams.get('Status')

    if (status !== 'OK') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`)
    }

    await connectDB()
    const purchase = await Purchase.findById(purchaseId)
    if (!purchase || purchase.status === 'paid') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`)
    }

    // Verify with ZarinPal
    const verifyRes = await fetch('https://api.zarinpal.com/pg/v4/payment/verify.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: purchase.amount * 10,
        authority,
      }),
    })

    const verifyData = await verifyRes.json()

    if (verifyData.data?.code === 100 || verifyData.data?.code === 101) {
      // Generate download token
      const downloadToken = uuidv4()
      const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

      await Purchase.findByIdAndUpdate(purchase._id, {
        status: 'paid',
        refId: verifyData.data.ref_id?.toString(),
        downloadToken,
        downloadTokenExpiry: expiry,
      })

      // Increment download count
      await Article.findByIdAndUpdate(purchase.articleId, {
        $inc: { downloadCount: 1 }
      })

      const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/download?token=${downloadToken}`

      // Send Telegram notification
      if (purchase.buyerTelegram) {
        await sendTelegramFile(
          purchase.buyerTelegram,
          downloadUrl,
          `مقاله: ${purchase.articleTitle}`
        )
      }

      // Notify admin
      await sendTelegramNotification(
        `💰 <b>فروش جدید!</b>\n\nمقاله: ${purchase.articleTitle}\nمبلغ: ${purchase.amount} تومان\nخریدار: ${purchase.buyerEmail}\nکد پیگیری: ${verifyData.data.ref_id}`
      )

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?token=${downloadToken}`
      )
    } else {
      await Purchase.findByIdAndUpdate(purchase._id, { status: 'failed' })
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`)
    }
  } catch (e) {
    console.error('Verify error:', e)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`)
  }
}
