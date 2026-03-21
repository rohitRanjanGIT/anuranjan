import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('adminAuthToken')?.value
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123'
    
    // Validate session cookie locally
    const expectedToken = Buffer.from(`${adminUsername}:${adminPassword}`).toString('base64')
    
    if (token === expectedToken) {
      return NextResponse.next()
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
