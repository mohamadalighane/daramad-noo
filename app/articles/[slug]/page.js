import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BuyButton from '@/components/BuyButton'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

async function getArticle(slug) {
  try {
    await connectDB()
    const article = await Article.findOne({ slug, isPublished: true }).lean()
    return article ? JSON.parse(JSON.stringify(article)) : null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'یافت نشد' }
  return {
    title: `${article.title} | درآمد نو`,
    description: article.description,
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const formatPrice = (p) => new Intl.NumberFormat('fa-IR').format(p)

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 16px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(14,165,233,0.1)', color: '#0ea5e9',
              padding: '4px 12px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
            }}>{article.category}</span>
            {article.tags?.map(tag => (
              <span key={tag} style={{
                background: 'rgba(255,255,255,0.05)', color: '#64748b',
                padding: '4px 12px', borderRadius: 9999, fontSize: 12,
              }}>#{tag}</span>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.4, marginBottom: 16 }}>
            {article.title}
          </h1>

          <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
            {article.description}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 20, color: '#475569', fontSize: 13 }}>
            <span>⬇ {article.downloadCount} دانلود</span>
            <span>📅 {new Date(article.createdAt).toLocaleDateString('fa-IR')}</span>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div style={{
            borderRadius: 20, overflow: 'hidden', marginBottom: 40,
            height: 300, background: `url(${article.coverImage}) center/cover`,
          }} />
        )}

        {/* Preview Content */}
        {article.previewContent && (
          <div className="glass" style={{ padding: 32, borderRadius: 20, marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: '#0ea5e9' }}>
              📖 پیش‌نمایش رایگان
            </h2>
            <div style={{
              color: '#94a3b8', lineHeight: 2, fontSize: 15,
              whiteSpace: 'pre-wrap',
            }}>
              {article.previewContent}
            </div>
            {!article.isFree && (
              <div style={{
                marginTop: 24,
                padding: '20px',
                background: 'linear-gradient(to bottom, transparent, rgba(10,15,30,0.95))',
                borderRadius: 12,
                textAlign: 'center',
              }}>
                <p style={{ color: '#64748b', marginBottom: 12 }}>
                  🔒 برای دسترسی به محتوای کامل، مقاله را خریداری کنید
                </p>
              </div>
            )}
          </div>
        )}

        {/* Buy Section */}
        <div className="glass" style={{
          padding: 32, borderRadius: 20, textAlign: 'center',
          border: '1px solid rgba(245,158,11,0.2)',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(14,165,233,0.05))',
        }}>
          {article.isFree ? (
            <>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#f59e0b' }}>
                🎁 این مقاله رایگان است!
              </div>
              <p style={{ color: '#64748b', marginBottom: 24 }}>
                برای دانلود، روی دکمه زیر کلیک کنید
              </p>
              <a href={article.fileUrl} download
                className="btn-gold" style={{ fontSize: 16, display: 'inline-block' }}>
                دانلود رایگان ⬇
              </a>
            </>
          ) : (
            <>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b', marginBottom: 8 }}>
                {formatPrice(article.price)} تومان
              </div>
              <p style={{ color: '#64748b', marginBottom: 8 }}>
                📦 دریافت فوری فایل + ارسال به تلگرام
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ color: '#22c55e', fontSize: 13 }}>✅ پرداخت امن</span>
                <span style={{ color: '#22c55e', fontSize: 13 }}>✅ تحویل فوری</span>
                <span style={{ color: '#22c55e', fontSize: 13 }}>✅ ضمانت بازگشت</span>
              </div>
              <BuyButton articleId={article._id} articleTitle={article.title} price={article.price} />
            </>
          )}
        </div>

        {/* Trust Signals */}
        <div style={{
          marginTop: 32, padding: 24,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 16,
        }}>
          {[
            { icon: '🔒', text: 'درگاه پرداخت زرین‌پال' },
            { icon: '⚡', text: 'لینک دانلود آنی' },
            { icon: '📱', text: 'ارسال به تلگرام' },
            { icon: '↩', text: 'ضمانت ۷ روزه' },
          ].map(t => (
            <div key={t.icon} style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{t.icon}</div>
              {t.text}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
