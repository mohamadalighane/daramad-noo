import Link from 'next/link'

export default function PaymentFailed() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0f1e', fontFamily: 'Vazirmatn, sans-serif', direction: 'rtl', padding: 24,
    }}>
      <div style={{
        background: 'rgba(17,24,39,0.9)', padding: 48, borderRadius: 24,
        border: '1px solid rgba(239,68,68,0.3)', maxWidth: 480, width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>😞</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#ef4444', marginBottom: 12 }}>
          پرداخت ناموفق
        </h1>
        <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 32 }}>
          پرداخت شما تکمیل نشد یا لغو شد.
          مبلغی از حساب شما کسر نشده است.
        </p>
        <Link href="/articles" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
          color: 'white', padding: '12px 28px', borderRadius: 12,
          fontWeight: 700, textDecoration: 'none',
        }}>
          ← بازگشت و تلاش مجدد
        </Link>
      </div>
    </div>
  )
}
