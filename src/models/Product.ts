import mongoose, { Schema, Document } from 'mongoose';
const models = mongoose.models;
import { Product as ProductType } from '../types/product.js';

export interface IProduct extends Omit<ProductType, 'id'>, Document {
  id: number;
}

const productSchema = new Schema<IProduct>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String, required: true },
  material: { 
    type: String, 
    enum: ['Nike', 'Adidas', 'Puma', 'Under Armour'],
    required: true 
  },
  category: { 
    type: String, 
    enum: ['Running', 'Basketball', 'Football', 'Tennis', 'Swimming', 'Gym', 'Cycling'],
    required: true 
  },
  weight: { type: String, required: true },
  image: { type: String, required: true },
  images: [String],
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviews: { type: Number, required: true, min: 0 },
  dailyWear: { type: Boolean }
}, { timestamps: true });

export default models.Product || mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

