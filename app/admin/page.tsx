'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/')
    }
  }, [status, session, router])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Link href="/admin/add-item">
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Add New Menu Item
        </button>
      </Link>
      {/* You can also show a list of existing items here */}
    </div>
  )
}
