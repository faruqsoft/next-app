import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-32">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to ProductApp</h1>
        <p className="text-xl mb-8">Discover amazing products in our marketplace. Browse freely or sign in to add your own products.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/products" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 min-w-[200px]"
          >
            Browse Products
          </Link>
          <Link 
            href="/login" 
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 min-w-[200px]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
