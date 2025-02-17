import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

export const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    model: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);
