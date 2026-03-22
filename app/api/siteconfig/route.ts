import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

// GET /api/siteconfig - Public route to get site config
export async function GET() {
  try {
    const config = await prisma.siteconfig.findFirst()
    return NextResponse.json(config || {})
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site config' }, { status: 500 })
  }
}

// POST /api/siteconfig - Protected route to update/create site config
export async function POST(req: Request) {
  try {
    // Check auth
    const cookieStore = await cookies()
    const token = cookieStore.get('adminAuthToken')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { email, addresslink, address1, address2, city, state, phone, mobile } = body

    // Always keep only one config record (using findFirst to get its ID, then update, or create if none)
    const existing = await prisma.siteconfig.findFirst()

    if (existing) {
      const updated = await prisma.siteconfig.update({
        where: { id: existing.id },
        data: { email, addresslink, address1, address2, city, state, phone, mobile }
      })
      return NextResponse.json(updated)
    } else {
      const created = await prisma.siteconfig.create({
        data: { email, addresslink, address1, address2, city, state, phone, mobile }
      })
      return NextResponse.json(created)
    }
  } catch (error) {
    console.error('Error updating site config:', error)
    return NextResponse.json({ error: 'Failed to update site config' }, { status: 500 })
  }
}
