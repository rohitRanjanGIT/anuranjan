import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// POST /api/admin - Create or update an admin
export async function POST(req: Request) {
  try {
    // Only allow if no admins exist or if current user is admin
    const cookieStore = await cookies()
    const token = cookieStore.get('adminAuthToken')?.value
    
    const adminCount = await prisma.admin.count()
    let isAuthorized = false

    if (adminCount === 0) {
      // Allow initial setup
      isAuthorized = true
    } else if (token) {
      const payload = await verifyToken(token)
      if (payload?.role === 'admin') {
        isAuthorized = true
      }
    }

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { username, password } = await req.json()
    if (!username || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingAdmin = await prisma.admin.findUnique({ where: { username } })

    if (existingAdmin) {
      const updated = await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: { password: hashedPassword, jwtToken: '' }
      })
      // Omit password from response
      const { password: _, ...adminData } = updated
      return NextResponse.json(adminData)
    } else {
      const created = await prisma.admin.create({
        data: { username, password: hashedPassword, jwtToken: '' }
      })
      const { password: _, ...adminData } = created
      return NextResponse.json(adminData)
    }

  } catch (error) {
    console.error('Error creating/updating admin:', error)
    return NextResponse.json({ error: 'Failed to process admin' }, { status: 500 })
  }
}
