import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    
    // First, try verifying against the database admin model
    const adminUser = await prisma.admin.findUnique({ where: { username } })
    let isValid = false

    if (adminUser) {
      isValid = await bcrypt.compare(password, adminUser.password)
    } else {
      // Fallback for initial setup configuration
      const validUsername = process.env.ADMIN_USERNAME || 'admin'
      const validPassword = process.env.ADMIN_PASSWORD || 'password123'
      if (username === validUsername && password === validPassword) {
        isValid = true
      }
    }

    if (isValid) {
      const response = NextResponse.json({ success: true })
      
      const payload = { 
        username, 
        role: 'admin',
        id: adminUser?.id 
      }
      
      const token = await signToken(payload)
      
      // Update jwtToken in db if admin user exists
      if (adminUser) {
        await prisma.admin.update({
          where: { id: adminUser.id },
          data: { jwtToken: token }
        })
      }
      
      response.cookies.set({
        name: 'adminAuthToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
      })
      
      return response
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
