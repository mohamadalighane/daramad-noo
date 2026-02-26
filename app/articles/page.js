import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

async function getArticles(category) {
  try {
    await connectDB()
    const filter = { isPublished: true }
    if (category && category !== 'همه') filter.category = category
    const articles = await Article.find(filter).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(articles))
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    await connectDB()
    const cats = await Article.distinct('category', { isPublished: true })
    return cats
  } catch {
    return []
  }
}

export default async function ArticlesPage({ searchParams }) {
  const category = searchParams?.category || 'همه'
  const [articles, categories] = await Promise.all([
    getArticles(category),
    getCategories(),
  ])

  const allCategories = ['همه', ...categories]

  return (
    <>
      <Navbar />
      <main style={{ padding: '40px 16px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>همه مقالات</h1>
          <p style={{ color: '#475569' }}>مقالات تخصصی کسب درآمد آنلاین</p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
          {allCategories.map(cat => (
            <a key={cat} href={`/articles?category=${encodeURIComponent(cat)}`}
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                background: category === cat ? 'linear-gradient(135deg, #0ea5e9, #0369a1)' : 'rgba(255,255,255,0.05)',
                color: category === cat ? 'white' : '#64748b',
                border: '1px solid',
                borderColor: category === cat ? 'transparent' : 'rgba(255,255,255,0.1)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}>
              {cat}
            </a>
          ))}
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {articles.map((article, i) => (
              <ArticleCard key={article._id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#475569', padding: 80 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p>هنوز مقاله‌ای در این دسته‌بندی وجود ندارد.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
