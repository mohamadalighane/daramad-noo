'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    title: '', description: '', previewContent: '',
    fileUrl: '', price: '', isFree: false,
    category: 'عمومی', tags: '', coverImage: ''
  })

  const login = async () => {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setLoggedIn(true)
      loadArticles()
    } else {
      alert('رمز اشتباه است!')
    }
  }

  const loadArticles = async () => {
    const res = await fetch('/api/articles')
    const data = await res.json()
    setArticles(data.articles || [])
  }

  const addArticle = async () => {
    setLoading(true)
    setMsg('')
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseInt(form.price) || 0,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setMsg('✅ مقاله با موفقیت اضافه شد!')
      setForm({ title: '', description: '', previewContent: '', fileUrl: '', price: '', isFree: false, category: 'عمومی', tags: '', coverImage: '' })
      loadArticles()
    } else {
      setMsg('❌ خطا: ' + data.error)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: '#f1f5f9', fontSize: 14,
    fontFamily: 'Vazirmatn, sans-serif',
    outline: 'none', marginBottom: 12,
    direction: 'rtl',
  }

  if (!loggedIn) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0f1e',
      }}>
        <div style={{
          background: 'rgba(17,24,39,0.9)', padding: 40, borderRadius: 20,
          border: '1px solid rgba(14,165,233,0.2)', width: 360, textAlign: 'center',
          fontFamily: 'Vazirmatn, sans-serif',
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔐</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, color: '#f1f5f9' }}>ورود ادمین</h1>
          <input
            type="password"
            placeholder="رمز عبور ادمین"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ ...inputStyle, marginBottom: 16 }}
          />
          <button onClick={login} className="btn-primary" style={{ width: '100%' }}>ورود</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', fontFamily: 'Vazirmatn, sans-serif', padding: 24, direction: 'rtl' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 32, color: '#f1f5f9' }}>
          🛠 پنل مدیریت درآمد نو
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Add Article Form */}
          <div style={{ background: 'rgba(17,24,39,0.8)', padding: 28, borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#0ea5e9' }}>➕ افزودن مقاله جدید</h2>
            
            <input placeholder="عنوان مقاله *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} />
            <textarea placeholder="توضیح کوتاه *" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              style={{ ...inputStyle, height: 80, resize: 'vertical' }} />
            <textarea placeholder="محتوای پیش‌نمایش رایگان" value={form.previewContent} onChange={e => setForm(p => ({ ...p, previewContent: e.target.value }))}
              style={{ ...inputStyle, height: 120, resize: 'vertical' }} />
            <input placeholder="لینک فایل (Google Drive, GitHub...) *" value={form.fileUrl} onChange={e => setForm(p => ({ ...p, fileUrl: e.target.value }))} style={{ ...inputStyle, direction: 'ltr' }} />
            <input placeholder="لینک تصویر کاور" value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))} style={{ ...inputStyle, direction: 'ltr' }} />
            <input placeholder="دسته‌بندی" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={inputStyle} />
            <input placeholder="تگ‌ها (با کاما جدا کنید)" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} style={inputStyle} />
            
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isFree} onChange={e => setForm(p => ({ ...p, isFree: e.target.checked }))} />
                رایگان است
              </label>
              {!form.isFree && (
                <input type="number" placeholder="قیمت (تومان)" value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
              )}
            </div>

            {msg && <p style={{ color: msg.startsWith('✅') ? '#22c55e' : '#ef4444', marginBottom: 12, fontSize: 14 }}>{msg}</p>}
            
            <button onClick={addArticle} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
              {loading ? 'در حال ذخیره...' : 'ذخیره مقاله'}
            </button>
          </div>

          {/* Articles List */}
          <div style={{ background: 'rgba(17,24,39,0.8)', padding: 28, borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#0ea5e9' }}>
              📋 مقالات ({articles.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 600, overflowY: 'auto' }}>
              {articles.map(a => (
                <div key={a._id} style={{
                  padding: 16, borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{a.title}</div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 12, color: '#64748b' }}>
                    <span>{a.isFree ? '🆓 رایگان' : `💰 ${new Intl.NumberFormat('fa-IR').format(a.price)} تومان`}</span>
                    <span>⬇ {a.downloadCount}</span>
                    <span>{a.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
