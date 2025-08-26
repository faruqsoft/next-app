import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// GET all products
export async function GET() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

// POST create new product (protected)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, imageUrl } = body;

  if (!name || !description || !price) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await connectDB();
  const product = await Product.create({ name, description, price, imageUrl });
  return NextResponse.json(product, { status: 201 });
}
