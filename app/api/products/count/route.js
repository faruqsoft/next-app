import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    const mongoose = await connectDB();
    console.log('MongoDB connection status:', mongoose.connection.readyState);

    const count = await Product.countDocuments({});
    console.log('Product count:', count);

    return NextResponse.json({ count, success: true });
  } catch (error) {
    console.error('Error getting product count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product count', details: error.message },
      { status: 500 }
    );
  }
}
