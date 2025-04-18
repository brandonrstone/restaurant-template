'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type MenuItemFormData = {
  name: string
  description: string
  price: string
  category: string
  image: string
}

const menuCategories = ['main', 'dessert', 'drink'] as const
const formFields: (keyof MenuItemFormData)[] = ['name', 'description', 'price', 'image']

type MenuItemOption = {
  name: string
  price: string
}

export default function AddMenuItem() {
  const router = useRouter()
  const [form, setForm] = useState<MenuItemFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  const [options, setOptions] = useState<MenuItemOption[]>([{ name: '', price: '' }])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const filteredOptions = options
      .filter(opt => opt.name && opt.price)
      .map(opt => ({
        name: opt.name,
        price: parseFloat(opt.price),
      }))

    const res = await fetch('/api/admin/add-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        options: filteredOptions.length > 0 ? filteredOptions : undefined,
      }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      alert('Error creating item')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Add New Menu Item</h1>

      {formFields.map(field => (
        <input
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 border rounded"
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          required={field !== 'image'}
        />
      ))}

      <select
        className="w-full p-2 border rounded"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        {menuCategories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Item Options (e.g. Size, Add-ons)</h2>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              placeholder="Option Name (e.g. Large)"
              className="w-1/2 p-2 border rounded"
              value={option.name}
              onChange={e => {
                const updated = [...options]
                updated[index].name = e.target.value
                setOptions(updated)
              }}
            />
            <input
              placeholder="Price (e.g. 1.50)"
              className="w-1/2 p-2 border rounded"
              type="number"
              min="0"
              step="0.01"
              value={option.price}
              onChange={e => {
                const updated = [...options]
                updated[index].price = e.target.value
                setOptions(updated)
              }}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => setOptions([...options, { name: '', price: '' }])}
          className="text-blue-600 underline"
        >
          + Add Another Option
        </button>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
        Add Item
      </button>
    </form>
  )
}
