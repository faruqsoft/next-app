import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(_req, { params }) {
  const { id } = params;
  await connectDB();

  try {
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
