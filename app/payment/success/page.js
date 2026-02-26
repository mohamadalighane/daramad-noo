import Link from 'next/link'

export default function PaymentSuccess({ searchParams }) {
  const token = searchParams?.token

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0f1e', fontFamily: 'Vazirmatn, sans-serif', direction: 'rtl', padding: 24,
    }}>
      <div style={{
        background: 'rgba(17,24,39,0.9)', padding: 48, borderRadius: 24,
        border: '1px solid rgba(34,197,94,0.3)', maxWidth: 480, width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#22c55e', marginBottom: 12 }}>
          پرداخت موفق!
        </h1>
        <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 32 }}>
          تشکر از خرید شما! مقاله با موفقیت خریداری شد.
          اگر آی‌دی تلگرام داده بودید، فایل بلافاصله ارسال شده است.
        </p>

        {token && (
          <a href={`/api/download?token=${token}`}
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white', padding: '14px 28px', borderRadius: 12,
              fontWeight: 800, fontSize: 16, textDecoration: 'none',
              marginBottom: 16,
            }}>
            ⬇ دانلود مقاله
          </a>
        )}

        <p style={{ color: '#475569', fontSize: 13, marginBottom: 24 }}>
          ⏰ لینک دانلود تا ۲۴ ساعت معتبر است
        </p>

        <Link href="/articles" style={{ color: '#0ea5e9', fontSize: 14 }}>
          ← بازگشت به مقالات
        </Link>
      </div>
    </div>
  )
}
