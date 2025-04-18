import { NextResponse } from 'next/server'

import { prisma } from '@/app/lib/db'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()

  const updatedOrder = await prisma.order.update({ where: { id: Number(params.id) }, data: { status } })

  return NextResponse.json(updatedOrder)
}
