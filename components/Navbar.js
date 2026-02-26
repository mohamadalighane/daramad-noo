'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="glass sticky top-0 z-50" style={{ borderBottom: '1px solid rgba(14,165,233,0.2)' }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #0ea5e9, #f59e0b)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: '#000'
          }}>د</div>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#f1f5f9' }}>
            درآمد <span style={{ color: '#0ea5e9' }}>نو</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" style={{ color: '#94a3b8', fontSize: 15, fontWeight: 600 }}
            className="hover:text-sky-400 transition-colors">خانه</Link>
          <Link href="/articles" style={{ color: '#94a3b8', fontSize: 15, fontWeight: 600 }}
            className="hover:text-sky-400 transition-colors">مقالات</Link>
          <a href="https://t.me/your_channel" target="_blank" rel="noreferrer"
            style={{ color: '#94a3b8', fontSize: 15, fontWeight: 600 }}
            className="hover:text-sky-400 transition-colors">تلگرام</a>
        </div>

        {/* CTA */}
        <Link href="/articles" className="hidden md:block btn-gold" style={{ fontSize: 14, padding: '8px 20px' }}>
          مشاهده مقالات
        </Link>

        {/* Mobile menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#94a3b8', fontSize: 24 }}>☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass px-4 py-4 flex flex-col gap-4">
          <Link href="/" style={{ color: '#94a3b8' }} onClick={() => setMenuOpen(false)}>خانه</Link>
          <Link href="/articles" style={{ color: '#94a3b8' }} onClick={() => setMenuOpen(false)}>مقالات</Link>
          <a href="https://t.me/your_channel" target="_blank" rel="noreferrer"
            style={{ color: '#94a3b8' }} onClick={() => setMenuOpen(false)}>تلگرام</a>
        </div>
      )}
    </nav>
  )
}
