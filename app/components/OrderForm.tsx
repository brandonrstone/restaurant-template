// components/OrderForm.tsx
'use client'

import { useState } from 'react'

export default function OrderForm() {
  const [items, setItems] = useState('')
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!items || total <= 0) {
      setError('Please provide valid items and total.')
      return
    }

    // Send order data to API
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        items,
        total,
        userId: 1, // Replace with session user ID when integrated
      })
    })

    const order = await response.json()
    console.log('Order placed:', order)
    // Handle success (e.g., redirect or show a confirmation)
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      {error && <p className="error-message">{error}</p>}
      <label>
        Items (comma-separated):
        <input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          required
        />
      </label>
      <label>
        Total:
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          min="1"
          required
        />
      </label>
      <button type="submit">Place Order</button>
    </form>
  )
}
