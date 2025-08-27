import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  image: {
    type: String,
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add any pre-save middleware if needed
ProductSchema.pre('save', function(next) {
  console.log('Saving product:', this);
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
