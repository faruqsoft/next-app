import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    const count = await Product.countDocuments();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting product count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
