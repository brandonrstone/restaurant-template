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
    select: { isAdmin: true },
  })

  if (!user?.isAdmin) {
    return new Response('Forbidden', { status: 403 })
  }

  try {
    const body = await req.json()

    const { options, ...menuItemData } = body

    const item = await prisma.menuItem.create({
      data: {
        ...menuItemData,
        options: {
          create: options?.map((opt: any) => ({
            label: opt.label,
            value: opt.value,
          })) || [],
        },
      },
    })

    return Response.json(item)
  } catch (err) {
    console.error('[ADD_ITEM_ERROR]', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
