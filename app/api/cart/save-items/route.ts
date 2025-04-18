import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/app/lib/db'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  console.log('Session object: ', session)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { items, total } = body

  await prisma.order.create({
    data: {
      user: { connect: { email: session.user.email } },
      items: JSON.stringify(items),
      total,
      status: 'Pending'
    }
  })

  return NextResponse.json({ success: true })
}
