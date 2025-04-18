'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { MenuItem } from '../menu/page'

export type MenuItemModalProps = {
  item: MenuItem
  isOpen: boolean
  onClose: () => void
}

export default function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  const { dispatch } = useCart()
  const [selectedOptions, setSelectedOptions] = useState<{ [optionId: number]: string }>({})
  const [quantity, setQuantity] = useState(1)

  // Extract unique option labels if they exist
  const optionGroups = item.options
    ? item.options.reduce((groups, option) => {
      if (!groups[option.name]) {
        groups[option.name] = []
      }
      groups[option.name].push(option)
      return groups
    }, {} as Record<string, typeof item.options>)
    : {}

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleAddToCart = () => {
    // Collect the selected options into an array for submission
    const selectedItems = Object.keys(selectedOptions).map(optionId => {
      const option = item.options?.find(o => o.id === Number(optionId))
      return option
    })

    dispatch({ type: 'ADD_ITEM', item: { id: item.id, name: item.name, price: item.price, quantity, options: selectedItems } })
    onClose()
    setQuantity(1)
    setSelectedOptions({})
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white p-6 rounded shadow-xl transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-black text-lg font-semibold">{item.name}</h2>
        <p className="text-black text-sm mb-4">{item.description}</p>

        {Object.entries(optionGroups).map(([label, options]) => (
          <div key={label} className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <select
              className="w-full border rounded p-2"
              value={selectedOptions[options[0]?.id || ''] || ''}
              onChange={e => setSelectedOptions({ ...selectedOptions, [options[0]?.id]: e.target.value })}
            >
              <option value="">Select a {label.toLowerCase()}</option>
              {options.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.name} (+${opt.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex items-center justify-between mb-4">
          <label className="font-medium text-black">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-20 border p-1 rounded text-center text-black"
          />
        </div>

        <button
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddToCart}
          disabled={Object.values(selectedOptions).length !== Object.keys(optionGroups).length}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
