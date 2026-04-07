import mongoose, { Schema, Document } from 'mongoose';
const models = mongoose.models;
import bcrypt from 'bcryptjs';

export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  addresses: Address[];
  comparePassword(password: string): Promise<boolean>;
}

const addressSchema = new Schema<Address>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  addresses: [addressSchema]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default models.User || mongoose.models.User || mongoose.model<IUser>('User', userSchema);

