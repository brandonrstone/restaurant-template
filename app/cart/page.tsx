'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '../hooks/useCart'

export default function CartPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: state.items, total })
      })

      if (res.ok) {
        dispatch({ type: 'CLEAR_CART' })
        router.push('/order-success') // Make a "Thank you" page if you like
      } else {
        const err = await res.json()
        alert(`Checkout failed: ${err.error}`)
      }
    } catch (error) {
      alert('Something went wrong.')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {state.items.map(item => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {state.items.length > 0 && (
        <>
          <p className="mt-4 font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}
