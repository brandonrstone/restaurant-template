import { prisma } from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isAdmin: true }
  })

  if (!user?.isAdmin) {
    return new Response('Forbidden', { status: 403 })
  }

  try {
    const data = await req.json()
    const item = await prisma.menuItem.create({ data })
    return Response.json(item)
  } catch (err) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
