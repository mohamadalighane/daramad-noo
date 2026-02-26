import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Purchase from '@/models/Purchase'
import Article from '@/models/Article'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'توکن نامعتبر' }, { status: 400 })
    }

    await connectDB()
    const purchase = await Purchase.findOne({ downloadToken: token, status: 'paid' })

    if (!purchase) {
      return NextResponse.json({ error: 'لینک نامعتبر یا منقضی شده' }, { status: 404 })
    }

    if (purchase.downloadTokenExpiry < new Date()) {
      return NextResponse.json({ error: 'لینک دانلود منقضی شده است (۲۴ ساعت)' }, { status: 410 })
    }

    if (purchase.downloadCount >= 3) {
      return NextResponse.json({ error: 'حداکثر تعداد دانلود استفاده شده' }, { status: 403 })
    }

    const article = await Article.findById(purchase.articleId)
    if (!article) {
      return NextResponse.json({ error: 'فایل یافت نشد' }, { status: 404 })
    }

    // Increment download count
    await Purchase.findByIdAndUpdate(purchase._id, { $inc: { downloadCount: 1 } })

    // Redirect to actual file
    return NextResponse.redirect(article.fileUrl)
  } catch (e) {
    console.error('Download error:', e)
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 })
  }
}
