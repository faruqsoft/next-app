import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow hover:shadow-lg p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <Link href={`/products/${product._id}`} className="text-blue-600 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}
