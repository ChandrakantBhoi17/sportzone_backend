import mongoose, { Schema, Document } from 'mongoose';
const models = mongoose.models;

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  material: string;
  category: string;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  material: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Calculate total price before saving
cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

export default models.Cart || mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);

