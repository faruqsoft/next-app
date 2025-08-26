// components/LayoutWrapper.jsx
"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function LayoutWrapper({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
