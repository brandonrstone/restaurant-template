// api/restore-cart/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/db'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userEmail = session.user.email
  const savedCart = await prisma.order.findFirst({ where: { user: { email: userEmail }, status: 'Pending' }, })

  if (!savedCart) return NextResponse.json({ items: [] })

  const items = JSON.parse(savedCart.items)

  return NextResponse.json({ items })
}
