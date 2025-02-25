import { Schema, model } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';

const CartItemSchema = new Schema<TCartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Cart = model<TCart>('Cart', CartSchema);
