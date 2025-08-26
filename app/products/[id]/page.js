import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function ProductDetails({ params }) {
  const { id } = params;
  await connectDB();
  const product = await Product.findById(id).lean();

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <img src={product.imageUrl || "/placeholder.png"} alt={product.name} className="w-full h-60 object-cover rounded" />
      <h1 className="mt-4 text-2xl font-bold">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 font-semibold text-lg">${product.price}</p>
    </div>
  );
}
