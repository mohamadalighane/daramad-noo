import Link from 'next/link'

export default function ArticleCard({ article, index = 0 }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price)
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="article-card glass rounded-2xl overflow-hidden cursor-pointer"
        style={{ animationDelay: `${index * 0.1}s` }}>
        
        {/* Cover */}
        <div style={{
          height: 180,
          background: article.coverImage
            ? `url(${article.coverImage}) center/cover`
            : `linear-gradient(135deg, hsl(${(index * 47) % 360}, 70%, 20%), hsl(${(index * 47 + 60) % 360}, 70%, 15%))`,
          position: 'relative',
        }}>
          {/* Badges */}
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
            {article.isFree ? (
              <span className="badge-gold">رایگان</span>
            ) : (
              <span style={{
                background: 'rgba(14,165,233,0.9)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: 9999,
              }}>پولی</span>
            )}
            {article.downloadCount > 10 && (
              <span style={{
                background: 'rgba(239,68,68,0.9)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: 9999,
              }}>پرفروش 🔥</span>
            )}
          </div>
          {/* Category */}
          <div style={{
            position: 'absolute', bottom: 12, right: 12,
            background: 'rgba(0,0,0,0.6)',
            color: '#94a3b8',
            fontSize: '0.75rem',
            padding: '2px 10px',
            borderRadius: 9999,
          }}>{article.category}</div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 20px 16px' }}>
          <h3 style={{
            fontSize: 16, fontWeight: 800, color: '#f1f5f9',
            marginBottom: 8, lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{article.title}</h3>

          <p style={{
            fontSize: 13, color: '#64748b', lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 16,
          }}>{article.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Price */}
            <div>
              {article.isFree ? (
                <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: 15 }}>رایگان ✨</span>
              ) : (
                <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: 15 }}>
                  {formatPrice(article.price)} تومان
                </span>
              )}
            </div>
            {/* Downloads */}
            <span style={{ color: '#475569', fontSize: 12 }}>
              ⬇ {article.downloadCount} دانلود
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(14,165,233,0.05)',
          textAlign: 'center',
          fontSize: 14,
          color: '#0ea5e9',
          fontWeight: 700,
        }}>
          {article.isFree ? 'دانلود رایگان →' : 'مشاهده و خرید →'}
        </div>
      </div>
    </Link>
  )
}
