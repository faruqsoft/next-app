"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-4"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-4"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full mb-4"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}
