import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// When a user places an order from the checkout page
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { items, total } = await request.json()

  // Clean up saved cart
  await prisma.order.deleteMany({
    where: { user: { email: session.user.email }, status: 'Pending' }
  })

  // Save actual submitted order
  const newOrder = await prisma.order.create({
    data: {
      user: { connect: { email: session.user.email } },
      items: JSON.stringify(items),
      total,
      status: 'Submitted'
    }
  })

  return NextResponse.json(newOrder)
}

// When you fetch all orders for a logged-in user to display on /orders
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Only fetch submitted orders - this might be revised and changed entirely later
  const orders = await prisma.order.findMany({
    where: { user: { email: session.user.email }, status: 'Submitted' }
  })

  return NextResponse.json(orders)
}



