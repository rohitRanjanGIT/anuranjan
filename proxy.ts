import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function proxy(req: NextRequest) {
  const url = req.nextUrl
  
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('adminAuthToken')?.value
    
    if (!token) {
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const payload = await verifyToken(token)
      if (payload) {
        return NextResponse.next()
      }
    } catch (err) {
      // In case of any error with verification
    }
    
    // Redirect securely to custom login page if invalid or missing token
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

// Config to apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*'],
}
