import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(req) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const filter = { isPublished: true }
    if (category) filter.category = category
    const articles = await Article.find(filter).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ articles })
  } catch (e) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 })
  }
}

export async function POST(req) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 401 })
  }

  try {
    await connectDB()
    const body = await req.json()
    const { title, description, previewContent, fileUrl, price, isFree, category, tags, coverImage } = body

    if (!title || !description || !fileUrl) {
      return NextResponse.json({ error: 'فیلدهای الزامی را پر کنید' }, { status: 400 })
    }

    // Generate slug
    const slug = title
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0600-\u06FF-]/g, '')
      .toLowerCase()
      + '-' + Date.now()

    const article = new Article({
      title, description, previewContent, fileUrl,
      price: isFree ? 0 : price,
      isFree: !!isFree, category: category || 'عمومی',
      tags: tags || [], coverImage: coverImage || '', slug,
    })

    await article.save()
    return NextResponse.json({ article }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'خطای سرور: ' + e.message }, { status: 500 })
  }
}
