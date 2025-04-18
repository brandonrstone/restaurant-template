// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="relative bg-cover bg-center h-screen" /* style={{ backgroundImage: "url('/hero-image.jpg')" }} */>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Savor</h1>
            <p className="text-xl mb-6">Delicious, fresh, and local cuisine delivered to your table</p>
            <a href="/menu" className="px-6 py-3 bg-yellow-500 text-black rounded-full text-lg font-semibold hover:bg-yellow-400 transition">
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Specialties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* <Image src="/images/dish-1.jpg" alt="Dish 1" className="rounded-md mb-4 w-full h-48 object-cover" width={300} height={300} /> */}
            <h3 className="text-xl font-semibold">Farmhouse Pasta</h3>
            <p className="text-gray-600 mt-2">Fresh, locally-sourced ingredients with house-made sauce.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* <Image src="/images/dish-2.jpg" alt="Dish 2" className="rounded-md mb-4 w-full h-48 object-cover" width={300} height={300} /> */}
            <h3 className="text-xl font-semibold">Grilled Seafood</h3>
            <p className="text-gray-600 mt-2">Lightly seasoned and grilled to perfection with herbs.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* <Image src="/images/dish-3.jpg" alt="Dish 3" className="rounded-md mb-4 w-full h-48 object-cover" width={300} height={300} /> */}
            <h3 className="text-xl font-semibold">Gourmet Burger</h3>
            <p className="text-gray-600 mt-2">Grass-fed beef, artisan buns, and savory toppings.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Reserve a Table</h2>
        <p className="mb-6 text-gray-700 max-w-xl mx-auto">
          Whether it's a date night, a family dinner, or a celebration — we've got you. Book ahead to guarantee your spot!
        </p>
        <a href="/reservation" className="px-6 py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition">
          Book Now
        </a>
      </section>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Savor. All rights reserved.</p>
      </footer>
    </main>
  );
}
