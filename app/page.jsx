"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <ProductHighlights />
      <Footer />
    </div>
  );
}
