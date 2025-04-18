import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/app/lib/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { items, total } = body

  // Store items as JSON string (or normalize into another table later)
  await prisma.order.create({
    data: {
      userId: user.id,
      items: JSON.stringify(items),
      total,
      status: 'Pending'
    }
  })

  return NextResponse.json({ message: 'Order created successfully' })
}
