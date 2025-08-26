export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to ProductApp</h1>
      <p className="text-lg mb-6">Explore our products or add your own after login.</p>
      <a href="/products" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold">
        View Products
      </a>
    </section>
  );
}
