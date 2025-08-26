export default async function ProductDetails({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`);
  const product = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="text-green-600 font-semibold text-xl">${product.price}</p>
    </div>
  );
}
