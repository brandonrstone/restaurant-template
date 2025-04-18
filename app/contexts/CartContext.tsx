'use client'

import { useSession } from 'next-auth/react'
import { createContext, useReducer, useEffect } from 'react'

type MenuItem = {
  id: number
  name: string
  price: number
}

export type CartItem = MenuItem & { quantity: number }

type CartState = {
  items: CartItem[]
}

type Action =
  | { type: 'ADD_ITEM'; item: MenuItem }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; items: CartItem[] }
  | { type: 'RESTORE_CART'; payload: CartItem[] }

export const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<Action> } | undefined>(undefined)

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map(i => i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i)
        }
      }
      return {
        items: [...state.items, { ...action.item, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(i => i.id !== action.id),
      }

    case 'CLEAR_CART':
      return { items: [] }

    case 'SET_CART':
      return { items: action.items }

    case 'RESTORE_CART':
      return { items: action.payload }

    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const { data: session } = useSession()

  // 1. Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      dispatch({ type: 'SET_CART', items: JSON.parse(stored) })
    }
  }, [])

  // 2. Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  // 3. Sync cart across tabs
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === 'cart') {
        const newCart = e.newValue ? JSON.parse(e.newValue) : []
        dispatch({ type: 'SET_CART', items: newCart })
      }
    }

    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  // 4. Save to DB if user is logged in and cart changes
  useEffect(() => {
    if (session?.user && state.items.length > 0) {
      const saveCart = async () => {
        const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        await fetch('/api/save-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: state.items, total }),
        })
      }
      saveCart()
    }
  }, [state.items, session])

  // 5. Restore from DB if user logs in
  useEffect(() => {
    if (session?.user) {
      const loadCart = async () => {
        const res = await fetch('/api/restore-cart')
        if (res.ok) {
          const data = await res.json()
          if (data.items?.length) {
            dispatch({ type: 'RESTORE_CART', payload: data.items })
          }
        }
      }
      loadCart()
    }
  }, [session])

  // ✅ 6. Clear cart on logout
  useEffect(() => {
    if (!session?.user) {
      dispatch({ type: 'CLEAR_CART' })
      localStorage.removeItem('cart')
    }
  }, [session])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}