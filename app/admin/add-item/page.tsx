'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const menuCategories = ['main', 'dessert', 'drink']

type Option = {
  label: string
  value: string
}

export default function AddMenuItem() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  })

  // Set options to an empty array by default
  const [options, setOptions] = useState<Option[]>([{ label: '', value: '' }])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out options with empty label or value
    const filteredOptions = options.filter(opt => opt.label && opt.value)

    // Prepare data for POST request
    const res = await fetch('/api/admin/add-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),  // Ensure price is a number
        options: filteredOptions.length > 0 ? filteredOptions : undefined, // Make options optional
      }),
    })

    // Handle response and redirect if successful
    if (res.ok) {
      router.push('/admin')
    } else {
      alert('Error creating item')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Add New Menu Item</h1>

      {/* Form fields for name, description, price, and image */}
      {['name', 'description', 'price', 'image'].map((field) => (
        <input
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 border rounded"
          value={(form as any)[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          required={field !== 'image'} // Make 'image' optional
        />
      ))}

      {/* Category selection dropdown */}
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

      {/* Item Options Section (optional) */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Item Options (e.g. Flavor, Size)</h2>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              placeholder="Label (e.g. Flavor)"
              className="w-1/2 p-2 border rounded"
              value={option.label}
              onChange={e => {
                const updated = [...options]
                updated[index].label = e.target.value
                setOptions(updated)
              }}
            />
            <input
              placeholder="Value (e.g. Vanilla)"
              className="w-1/2 p-2 border rounded"
              value={option.value}
              onChange={e => {
                const updated = [...options]
                updated[index].value = e.target.value
                setOptions(updated)
              }}
            />
          </div>
        ))}

        {/* Button to add more options */}
        <button
          type="button"
          onClick={() => setOptions([...options, { label: '', value: '' }])}
          className="text-blue-600 underline"
        >
          + Add Another Option
        </button>
      </div>

      {/* Submit Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
        Add Item
      </button>
    </form>
  )
}
