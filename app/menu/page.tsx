'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../hooks/useCart'
import { menuData } from '../data/menu'
import { MenuItemCard } from '../components/MenuItemCard'

const categories = ['all', 'main', 'dessert', 'drink']

export default function MenuPage() {
  const { state } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredMenu = activeCategory === 'all'
    ? menuData
    : menuData.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Our Menu</h1>
          {state.items.length > 0 && (
            <Link href="/checkout">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Checkout ({state.items.length})
              </button>
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center sm:justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`capitalize px-4 py-2 rounded-full transition font-medium ${activeCategory === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMenu.length > 0 ? (
            filteredMenu.map(item => (
              <MenuItemCard key={item.id} {...item} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No items found in this category.</p>
          )}
        </div>

        {/* Empty Cart */}
        {state.items.length === 0 && (
          <div className="text-center mt-12 text-gray-500">Your cart is empty. Start adding something delicious!</div>
        )}
      </main>
    </div>
  )
}
