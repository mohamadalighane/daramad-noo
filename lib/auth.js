import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export function isAdminAuthenticated() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return false
  const decoded = verifyToken(token)
  return decoded?.role === 'admin'
}
