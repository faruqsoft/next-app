"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });
  const [errors, setErrors] = useState({});

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render the form for unauthenticated users
  if (status === "unauthenticated") {
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.price || form.price <= 0) newErrors.price = "Valid price is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price)
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully!");
      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.price ? 'border-red-500' : ''
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL (Optional)
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding...
                </div>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

