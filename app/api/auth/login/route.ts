import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    const validUsername = process.env.ADMIN_USERNAME || 'admin'
    const validPassword = process.env.ADMIN_PASSWORD || 'password123'

    if (username === validUsername && password === validPassword) {
      const response = NextResponse.json({ success: true })
      
      const token = Buffer.from(`${validUsername}:${validPassword}`).toString('base64')
      
      response.cookies.set({
        name: 'adminAuthToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week duration securely mapping the domain
        path: '/'
      })
      
      return response
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
