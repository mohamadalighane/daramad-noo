import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

async function getLatestArticles() {
  try {
    await connectDB()
    const articles = await Article.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()
    return JSON.parse(JSON.stringify(articles))
  } catch {
    return []
  }
}

export default async function HomePage() {
  const articles = await getLatestArticles()

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          padding: '80px 16px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 400,
            background: 'radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="max-w-4xl mx-auto animate-fadeInUp">
            <div style={{
              display: 'inline-block',
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.3)',
              color: '#0ea5e9',
              padding: '6px 18px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 24,
            }}>
              🚀 مقالات تخصصی با هوش مصنوعی
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 900,
              lineHeight: 1.3,
              marginBottom: 24,
              color: '#f1f5f9',
            }}>
              راهنمای عملی
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>کسب درآمد آنلاین</span>
            </h1>

            <p style={{
              fontSize: 18, color: '#64748b', lineHeight: 1.8,
              maxWidth: 560, margin: '0 auto 40px',
            }}>
              مقالات عملی و کاربردی برای کسب درآمد از اینترنت — از فریلنسینگ تا فروش محصول دیجیتال
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/articles" className="btn-gold" style={{ fontSize: 16 }}>
                مشاهده همه مقالات ←
              </Link>
              <a href="https://t.me/your_channel" target="_blank" rel="noreferrer"
                className="btn-primary" style={{ fontSize: 16 }}>
                کانال تلگرام 📱
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: 32, justifyContent: 'center',
              marginTop: 56, flexWrap: 'wrap',
            }}>
              {[
                { number: '+۵۰', label: 'مقاله تخصصی' },
                { number: '+۲۰۰', label: 'خریدار موفق' },
                { number: '۱۰۰٪', label: 'رضایت مشتری' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#0ea5e9' }}>{stat.number}</div>
                  <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '40px 16px', background: 'rgba(17,24,39,0.5)' }}>
          <div className="max-w-6xl mx-auto">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {[
                { icon: '🤖', title: 'نوشته‌شده با AI', desc: 'محتوای دقیق و بررسی‌شده با هوش مصنوعی' },
                { icon: '⚡', title: 'تحویل فوری', desc: 'بلافاصله بعد از پرداخت دریافت کنید' },
                { icon: '📱', title: 'ارسال به تلگرام', desc: 'فایل مستقیم به تلگرام شما ارسال میشه' },
                { icon: '🔒', title: 'پرداخت امن', desc: 'درگاه زرین‌پال با رمزنگاری کامل' },
              ].map(f => (
                <div key={f.title} className="glass" style={{ padding: 24, borderRadius: 16 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                  <div style={{ color: '#475569', fontSize: 13 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section style={{ padding: '60px 16px' }}>
          <div className="max-w-6xl mx-auto">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 900 }}>آخرین مقالات</h2>
              <p style={{ color: '#475569', marginTop: 8 }}>جدیدترین راهنماهای عملی کسب درآمد</p>
            </div>

            {articles.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {articles.map((article, i) => (
                  <ArticleCard key={article._id} article={article} index={i} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#475569', padding: 60 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                <p>به زودی مقالات اضافه خواهند شد...</p>
              </div>
            )}

            {articles.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <Link href="/articles" className="btn-primary">
                  مشاهده همه مقالات
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '60px 16px',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(245,158,11,0.05))',
          borderTop: '1px solid rgba(14,165,233,0.15)',
          borderBottom: '1px solid rgba(14,165,233,0.15)',
        }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>
              در کانال تلگرام ما عضو شو 📱
            </h2>
            <p style={{ color: '#64748b', marginBottom: 32 }}>
              آخرین مقالات رایگان، تخفیف‌های ویژه، و نکات کسب درآمد آنلاین
            </p>
            <a href="https://t.me/your_channel" target="_blank" rel="noreferrer"
              className="btn-gold animate-pulse-glow" style={{ fontSize: 16, display: 'inline-block' }}>
              عضویت رایگان در تلگرام →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
