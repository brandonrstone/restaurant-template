// /app/api/menu/route.ts
import { prisma } from '@/app/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.error()
  }
}
