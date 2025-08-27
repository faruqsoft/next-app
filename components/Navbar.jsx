"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            ProductApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`hover:text-blue-400 transition ${
                  pathname === link.path ? "text-blue-400 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {session ? (
              <>
                <Link
                  href="/dashboard/add-product"
                  className={`hover:text-blue-400 transition ${
                    pathname === "/dashboard/add-product"
                      ? "text-blue-400 font-semibold"
                      : ""
                  }`}
                >
                  Add Product
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-3 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`hover:text-blue-400 transition ${
                  pathname === link.path ? "text-blue-400 font-semibold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {session ? (
              <>
                <Link
                  href="/dashboard/add-product"
                  className={`hover:text-blue-400 transition ${
                    pathname === "/dashboard/add-product"
                      ? "text-blue-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Product
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
