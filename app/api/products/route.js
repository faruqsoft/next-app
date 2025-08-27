import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    console.log('Total products found:', products.length);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    console.log('Creating product with data:', data);
    
    const product = await Product.create(data);
    console.log('Product created successfully:', product);
    
    // Fetch updated count
    const count = await Product.countDocuments();
    console.log('Updated product count:', count);
    
    return NextResponse.json({ 
      product,
      message: 'Product created successfully',
      count 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ 
      error: error.message,
      details: error 
    }, { status: 500 });
  }
}
