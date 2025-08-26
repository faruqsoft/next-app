"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">ProductApp</Link>
      <div className="space-x-4">
        <Link href="/products">Products</Link>
        {session ? (
          <>
            <Link href="/dashboard/add-product">Add Product</Link>
            <button onClick={() => signOut()} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="bg-blue-600 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
