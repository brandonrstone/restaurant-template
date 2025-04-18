'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCart } from '../hooks/useCart'

/*  
  Uses: /api/orders when a user places an order
*/

export default function CheckoutPage() {
  const { state: cart, dispatch } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmitOrder = async () => {
    // Implement a page for this?
    if (!session?.user) {
      alert('You must be signed in to place an order.')
      return
    }

    setSubmitting(true)

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.items, total })
    })

    if (res.ok) {
      alert('Order submitted successfully!')
      dispatch({ type: 'CLEAR_CART' })
      localStorage.removeItem('cart')
      router.push('/orders')
    } else {
      alert('Failed to submit order.')
    }

    setSubmitting(false)
  }

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', id: itemId })
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-4">
            {cart.items.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right font-bold text-lg mb-6">
            Total: ${total.toFixed(2)}
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded" onClick={handleSubmitOrder} disabled={submitting}>
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  )
}
