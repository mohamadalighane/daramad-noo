import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(17,24,39,0.9)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '48px 0 24px',
      marginTop: 80,
    }}>
      <div className="max-w-6xl mx-auto px-4">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          
          {/* Brand */}
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>
              درآمد <span style={{ color: '#0ea5e9' }}>نو</span>
            </div>
            <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.8 }}>
              مقالات تخصصی کسب درآمد آنلاین، فریلنسینگ، و کارآفرینی دیجیتال — نوشته‌شده با دقت و بررسی‌شده با هوش مصنوعی.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, color: '#f1f5f9' }}>دسترسی سریع</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/" style={{ color: '#475569', fontSize: 14 }} className="hover:text-sky-400 transition-colors">خانه</Link>
              <Link href="/articles" style={{ color: '#475569', fontSize: 14 }} className="hover:text-sky-400 transition-colors">همه مقالات</Link>
              <a href="https://t.me/your_channel" target="_blank" rel="noreferrer"
                style={{ color: '#475569', fontSize: 14 }} className="hover:text-sky-400 transition-colors">کانال تلگرام</a>
            </div>
          </div>

          {/* Trust */}
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, color: '#f1f5f9' }}>اطمینان خرید</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ color: '#475569', fontSize: 13 }}>✅ پرداخت امن (زرین‌پال)</span>
              <span style={{ color: '#475569', fontSize: 13 }}>✅ تحویل فوری فایل</span>
              <span style={{ color: '#475569', fontSize: 13 }}>✅ ارسال به تلگرام</span>
              <span style={{ color: '#475569', fontSize: 13 }}>✅ ضمانت بازگشت وجه</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          textAlign: 'center',
          color: '#334155',
          fontSize: 13,
        }}>
          © {new Date().getFullYear()} درآمد نو — تمام حقوق محفوظ است
        </div>
      </div>
    </footer>
  )
}
