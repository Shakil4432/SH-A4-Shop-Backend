import { model, Schema } from 'mongoose';
import { TOrders } from './order.interface';
import { productSchema } from '../products/product.model';

const orderSchema = new Schema<TOrders>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    products: { type: [productSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Shipping'],
      default: 'Pending',
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = model<TOrders>('Order', orderSchema);
