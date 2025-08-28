import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Image from "next/image";

export default async function ProductDetails({ params }) {
  const { id } = params;
  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-8 p-6 bg-white border rounded-lg shadow-md">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full h-[250px]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">No image available</p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">Name:{product.name}</h1>
            <p className="mt-2font bolt text-gray-600">Description:{product.description}</p>
            <p className="text-2xl font-bold text-blue-600"> Price:${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out transform active:scale-95">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
