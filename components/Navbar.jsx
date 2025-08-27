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

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  const dashboardLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Product", path: "/dashboard/add-product" },
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
            {publicLinks.map((link) => (
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
                {/* Dashboard Links */}
                <div className="relative group">
                  <button className={`flex items-center space-x-1 hover:text-blue-400 transition ${
                    pathname.startsWith("/dashboard") ? "text-blue-400 font-semibold" : ""
                  }`}>
                    <span>Dashboard</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {dashboardLinks.map((link) => (
                        <Link
                          key={link.path}
                          href={link.path}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                            pathname === link.path ? "bg-gray-100 font-semibold" : ""
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">
                    {session.user?.name || 'User'}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
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
            {publicLinks.map((link) => (
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
                {/* Dashboard Section in Mobile */}
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="text-sm text-gray-400 mb-2">Dashboard</div>
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`block hover:text-blue-400 transition ${
                        pathname === link.path ? "text-blue-400 font-semibold" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="text-sm text-gray-300 mb-2">
                    {session.user?.name || 'User'}
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
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
