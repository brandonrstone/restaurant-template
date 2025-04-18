import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.menuItemOption.deleteMany()
  await prisma.menuItem.deleteMany()

  // Dessert
  await prisma.menuItem.create({
    data: {
      name: 'Ice Cream Sundae',
      description: 'Vanilla ice cream with toppings',
      price: 4.99,
      category: 'dessert',
      image: '/images/sundae.jpg',
      options: {
        create: [
          { name: 'Vanilla', price: 0 },
          { name: 'Chocolate', price: 0 },
          { name: 'Sprinkles', price: 0.5 },
          { name: 'Cherries', price: 0.5 },
        ]
      }
    }
  })

  // Drink
  await prisma.menuItem.create({
    data: {
      name: 'Coffee',
      description: 'Fresh brewed coffee',
      price: 2.49,
      category: 'drink',
      image: '/images/coffee.jpg',
      options: {
        create: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 0.5 },
          { name: 'Large', price: 1.0 },
        ]
      }
    }
  })

  await prisma.menuItem.create({
    data: {
      name: 'Iced Tea',
      description: 'Chilled tea with lemon',
      price: 2.25,
      category: 'drink',
      image: '/images/iced-tea.jpg',
      options: {
        create: [
          { name: 'Sweet', price: 0 },
          { name: 'Unsweetened', price: 0 },
          { name: 'Lemon', price: 0.25 },
        ]
      }
    }
  })

  // Main
  await prisma.menuItem.create({
    data: {
      name: 'Cheeseburger',
      description: 'Beef patty with cheese, lettuce, tomato',
      price: 7.99,
      category: 'main',
      image: '/images/cheeseburger.jpg',
      options: {
        create: [
          { name: 'Cheddar', price: 0 },
          { name: 'Swiss', price: 0.5 },
          { name: 'Extra Patty', price: 2.0 },
        ]
      }
    }
  })

  await prisma.menuItem.create({
    data: {
      name: 'Veggie Wrap',
      description: 'Fresh grilled vegetables in a spinach wrap',
      price: 6.49,
      category: 'main',
      image: '/images/veggie-wrap.jpg',
      options: {
        create: [
          { name: 'Add Hummus', price: 0.75 },
          { name: 'Extra Veggies', price: 0.5 },
        ]
      }
    }
  })

  await prisma.menuItem.create({
    data: {
      name: 'Grilled Chicken Sandwich',
      description: 'Chicken breast, lettuce, tomato, mayo',
      price: 8.25,
      category: 'main',
      image: '/images/chicken-sandwich.jpg',
      options: {
        create: [
          { name: 'Add Bacon', price: 1.5 },
          { name: 'No Mayo', price: 0 },
        ]
      }
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
