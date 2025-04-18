'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useCart } from '../hooks/useCart'
import { MenuItem } from '../generated/prisma'
import { menuCategories } from '../data/menu'

export default function MenuPage() {
  const { state } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const filteredMenu = activeCategory === 'all' ? items : items.filter(item => item.category === activeCategory)

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true)
      const response = await fetch('/api/menu/fetch-menu-items')
      const data = await response.json()
      setItems(data)
      setLoading(false)
    }

    fetchMenuItems()
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <header className='bg-white shadow-sm sticky top-0 z-10'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-800'>Our Menu</h1>
          {state.items.length > 0 && (
            <Link href='/checkout'>
              <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'>
                Checkout ({totalItems})
              </button>
            </Link>
          )}
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-6 py-10'>
        {/* Category Filters */}
        <div className='flex flex-wrap gap-4 mb-8 justify-center sm:justify-start'>
          {menuCategories.map(cat => (
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

        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <MenuItemSkeleton key={i} />)
          ) : filteredMenu.length > 0 ? (
            filteredMenu.map(item => (
              <MenuItemCard key={item.id} {...item} />
            ))
          ) : (
            <p className='text-gray-500 col-span-full text-center'>No items found in this category.</p>
          )}
        </div>

        {/* <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredMenu.length > 0 ? (
            filteredMenu.map(item => (
              <MenuItemCard key={item.id} {...item} />
            ))
          ) : (
            <p className='text-gray-500 col-span-full text-center'>No items found in this category.</p>
          )}
        </div> */}


        {/* Empty Cart */}
        {state.items.length === 0 && <div className='text-center mt-12 text-gray-500'>Your cart is empty. Start adding something delicious!</div>}
      </main>
    </div>
  )
}

type MenuItemCardProps = {
  id: number
  name: string
  price: number
  description?: string | null // Allow both null and undefined for description
  image?: string | null // Allow both null and undefined for image
}

function MenuItemCard({ id, name, price, description, image }: MenuItemCardProps) {
  const { dispatch } = useCart()

  return (
    <div className='border p-4 rounded shadow bg-white'>
      {image && <img src={image} alt={name} className='w-full h-40 object-cover rounded mb-2' />}
      <h2 className='text-xl font-semibold'>{name}</h2>
      <p className='text-gray-600'>${price.toFixed(2)}</p>
      {description && <p className='text-sm text-gray-500'>{description}</p>}
      <button className='mt-2 px-4 py-1 bg-green-500 text-white rounded cursor-pointer' onClick={() => dispatch({ type: 'ADD_ITEM', item: { id, name, price } })}>
        Add to Cart
      </button>
    </div>
  )
}

function MenuItemSkeleton() {
  // Causes hydration error - look into it
  const nameWidth = Math.floor(Math.random() * 50) + 25
  const descriptionWidth = Math.floor(Math.random() * 50) + 40

  return (
    <div className='border p-4 rounded shadow bg-white animate-pulse'>
      <div className='w-full h-40 bg-gray-200 rounded mb-2' />
      <div className={`h-4.5 bg-gray-300 rounded mb-2`} style={{ width: `${nameWidth}%` }} />
      <div className='w-1/7 h-4 bg-gray-300 rounded mb-2' />
      <div className='w-full h-3 bg-gray-200 rounded mb-3' style={{ width: `${descriptionWidth}%` }} />
      <div className='w-1/3 h-8 bg-gray-300 rounded mt-2' />
    </div>
  )
}