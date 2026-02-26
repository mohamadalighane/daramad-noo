import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect admin page (but not login API)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_token')?.value
    if (!token || !verifyToken(token)) {
      // Allow page access (login is on the page itself)
      return NextResponse.next()
    }
  }

  // Security headers
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
