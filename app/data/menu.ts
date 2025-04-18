// data/menu.ts
export const menuCategories = ['all', 'main', 'dessert', 'drink']

export const menuData = [
  {
    id: 1,
    name: 'Truffle Pasta',
    description: 'Creamy pasta with black truffle oil and shaved parmesan.',
    price: 18.99,
    image: '/menu/truffle-pasta.jpg',
    category: 'main',
  },
  {
    id: 2,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla gelato.',
    price: 8.75,
    image: '/menu/lava-cake.jpg',
    category: 'dessert',
  },
  {
    id: 3,
    name: 'Avocado Toast',
    description: 'Sourdough toast topped with smashed avocado and chili flakes.',
    price: 9.99,
    image: '/menu/avocado-toast.jpg',
    category: 'main',
  },
  {
    id: 4,
    name: 'Fruit Smoothie',
    description: 'Freshly blended smoothie with seasonal fruits.',
    price: 7.00,
    image: '/menu/fruit-smoothie.jpg',
    category: 'drink',
  },
  {
    id: 5,
    name: 'Lobster Roll',
    description: 'Buttered roll stuffed with fresh lobster and aioli.',
    price: 21.00,
    image: '/menu/lobster-roll.jpg',
    category: 'main',
  },
  {
    id: 6,
    name: 'French Onion Soup',
    description: 'Caramelized onions in beef broth with melted gruyère.',
    price: 10.50,
    image: '/menu/french-onion-soup.jpg',
    category: 'main',
  },
  {
    id: 7,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked layers.',
    price: 7.99,
    image: '/menu/tiramisu.jpg',
    category: 'dessert',
  },
  {
    id: 8,
    name: 'Iced Latte',
    description: 'Chilled espresso with milk and ice.',
    price: 5.25,
    image: '/menu/iced-latte.jpg',
    category: 'drink',
  },
  {
    id: 9,
    name: 'Ice Cream',
    basePrice: 2.00,
    quantity: 2,
    selectedOptions: {
      flavor: 'Vanilla',
      size: 'Large',
      extras: ['Sprinkles', 'Caramel Drizzle'],
      notes: 'Extra cold please'
    },
    totalPrice: 4.50
  }
]
