import { Types } from 'mongoose';
import { TProduct } from '../products/product.interface';

export type TOrders = {
  userId: Types.ObjectId;
  products: TProduct[];
  totalPrice: number;
  status: 'Pending' | 'Shipping';
};
