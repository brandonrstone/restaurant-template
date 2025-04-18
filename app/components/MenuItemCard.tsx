'use client'

import Image from 'next/image'
import { useCart } from '../hooks/useCart'

interface MenuItemProps {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export function MenuItemCard({ id, name, description, price, image }: MenuItemProps) {
  const { dispatch } = useCart()

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <Image src={image} alt={name} width={400} height={250} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-green-600 font-bold">${price.toFixed(2)}</span>
          <button className="px-4 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition cursor-pointer" onClick={() => dispatch({ type: 'ADD_ITEM', item: { id, name, price } })}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
