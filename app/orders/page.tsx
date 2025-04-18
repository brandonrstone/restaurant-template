// app/orders/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type Order = {
  id: string
  status: string
  total: number
}

/*
  display order items from the JSON
  format totals as currency
  add order dates or sort them
  handle different order statuses (like Shipped, Delivered, etc.)
*/

export default function Orders() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])

  // Fetch orders when the session is available
  useEffect(() => {
    if (session?.user) {
      fetch('/api/orders')
        .then(async (res: Response) => {
          if (!res.ok) {
            const errorText = await res.text()
            console.error(`Failed to fetch orders: ${res.status} - ${errorText}`)
            return [] // Return empty array on error
          }

          const data: Order[] = await res.json()
          console.log('Fetched orders:', data) // Log the fetched orders
          return data
        })
        .then((data: Order[]) => {
          const uniqueOrders = data.filter((order, index, self) =>
            index === self.findIndex((o) => o.id === order.id)
          )
          console.log('Unique orders:', uniqueOrders) // Log the unique orders after filtering
          setOrders(uniqueOrders)
        })
        .catch(console.error)
    }
  }, [session])


  // Handle the order status update
  const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ status })
    })

    const updatedOrder = await response.json()
    // Update state with the newly updated order
    setOrders(prevOrders => prevOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order))
  }

  // Render loading or if the session is missing
  if (!session) return (
    <div>Please sign in to view your orders.</div>
  )

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id}: {order.status} - Total: ${order.total}
            <br />
            {/* Button to update order status */}
            <button
              onClick={() => updateOrderStatus(order.id, 'Completed')}
              disabled={order.status === 'Completed'} // Disable if already completed
            >
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
