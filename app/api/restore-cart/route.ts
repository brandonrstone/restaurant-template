// api/restore-cart/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/app/lib/db'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userEmail = session.user.email
  const savedCart = await prisma.order.findFirst({ where: { user: { email: userEmail }, status: 'Pending' }, })

  if (!savedCart) return NextResponse.json({ items: [] })

  const items = JSON.parse(savedCart.items)

  return NextResponse.json({ items })
}
