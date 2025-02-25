import { Types } from 'mongoose';

export type TCartItem = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TCart = {
  items: TCartItem[];
  createdAt: Date;
  updatedAt: Date;
};
