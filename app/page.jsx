"use client";
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProductHighlights />
    </div>
  );
}
