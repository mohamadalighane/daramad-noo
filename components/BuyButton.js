'use client'
import { useState } from 'react'

export default function BuyButton({ articleId, articleTitle, price }) {
  const [form, setForm] = useState({ email: '', phone: '', telegram: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState('form') // form | loading | error

  const handleBuy = async () => {
    if (!form.email) return setError('ایمیل الزامی است')
    if (!form.email.includes('@')) return setError('ایمیل معتبر وارد کنید')
    
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          ...form,
        }),
      })
      
      const data = await res.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'خطا در اتصال به درگاه')
        setLoading(false)
      }
    } catch {
      setError('خطای شبکه — لطفاً دوباره امتحان کنید')
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '0 auto 20px' }}>
        <input
          type="email"
          placeholder="ایمیل شما (برای ارسال لینک)"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#f1f5f9',
            fontSize: 14,
            fontFamily: 'Vazirmatn, sans-serif',
            textAlign: 'right',
            outline: 'none',
            direction: 'ltr',
          }}
        />
        <input
          type="tel"
          placeholder="شماره موبایل (اختیاری)"
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#f1f5f9',
            fontSize: 14,
            fontFamily: 'Vazirmatn, sans-serif',
            textAlign: 'right',
            outline: 'none',
          }}
        />
        <input
          type="text"
          placeholder="آی‌دی تلگرام مثل @username (برای ارسال فایل)"
          value={form.telegram}
          onChange={e => setForm(p => ({ ...p, telegram: e.target.value }))}
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#f1f5f9',
            fontSize: 14,
            fontFamily: 'Vazirmatn, sans-serif',
            textAlign: 'right',
            outline: 'none',
            direction: 'ltr',
          }}
        />
      </div>

      {error && (
        <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>
          ⚠ {error}
        </p>
      )}

      <button
        onClick={handleBuy}
        disabled={loading}
        className="btn-gold"
        style={{ fontSize: 18, padding: '14px 40px', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? '⏳ در حال اتصال به درگاه...' : `💳 خرید و دانلود — ${new Intl.NumberFormat('fa-IR').format(price)} تومان`}
      </button>
    </div>
  )
}
