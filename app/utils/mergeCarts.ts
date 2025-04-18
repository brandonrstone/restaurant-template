import { CartItem } from '../contexts/CartContext'

export function mergeCarts(localCart: CartItem[], dbCart: CartItem[]): CartItem[] {
  const mergedMap = new Map<number, CartItem>()

  // Add DB cart items first
  dbCart.forEach(item => { mergedMap.set(item.id, { ...item }) })

  // Merge in local items
  localCart.forEach(item => {
    if (mergedMap.has(item.id)) {
      const existing = mergedMap.get(item.id)!
      mergedMap.set(item.id, { ...existing, quantity: existing.quantity + item.quantity })
    } else {
      mergedMap.set(item.id, { ...item })
    }
  })

  return Array.from(mergedMap.values())
}
