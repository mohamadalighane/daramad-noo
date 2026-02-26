import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ error: 'رمز عبور الزامی است' }, { status: 400 })
    }

    const isValid = password === process.env.ADMIN_PASSWORD

    if (!isValid) {
      // Delay to prevent brute force
      await new Promise(r => setTimeout(r, 1500))
      return NextResponse.json({ error: 'رمز عبور اشتباه است' }, { status: 401 })
    }

    const token = signToken({ role: 'admin' })

    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return res
  } catch (e) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 })
  }
}
