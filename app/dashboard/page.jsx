'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchProductCount() {
      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (!res.ok) throw new Error('Failed to fetch products');
        const products = await res.json();
        setProductCount(products.length);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchProductCount();

    // Set up polling to refresh count every 5 seconds
    const interval = setInterval(fetchProductCount, 5000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Quick Actions Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="space-y-4">
          <a
            href="/dashboard/add-product"
            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add New Product
          </a>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            Logged in as: <span className="font-medium text-gray-900">{session?.user?.name}</span>
          </p>
          <p className="text-gray-600">
            Email: <span className="font-medium text-gray-900">{session?.user?.email}</span>
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-blue-600">{productCount}</p>
                <span className="ml-2 text-xs text-gray-500"></span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg 
                className={`w-6 h-6 text-blue-600 ${loading ? 'animate-spin' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-md font-semibold text-gray-900">
                {new Date().toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg 
                className="w-6 h-6 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
