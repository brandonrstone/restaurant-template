import React from 'react'
import { prisma } from '../lib/db'

const orders = await prisma.order.findMany({
  orderBy: { createdAt: 'desc' },
  include: { user: true }
})

export default function AdminPage() {
  return (
    <div>page</div>
  )
}
