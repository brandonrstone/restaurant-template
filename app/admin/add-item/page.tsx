'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const menuCategories = ['main', 'dessert', 'drink']

export default function AddMenuItem() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '', // Initialize category as an empty string
    image: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/admin/add-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) })
    })

    if (res.ok) router.push('/admin')
    else alert('Error creating item')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Add New Menu Item</h1>

      {['name', 'description', 'price', 'image'].map((field) => (
        <input
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 border rounded"
          value={(form as any)[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          required={field !== 'image'}
        />
      ))}

      {/* Category dropdown (select input) */}
      <select className="w-full p-2 border rounded" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
        <option value="">Select Category</option>
        {menuCategories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
        Add Item
      </button>
    </form>
  )
}
