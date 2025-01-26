import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { TOrders } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrders, userId: string) => {
  console.log(userId);
  const isUserExist = await User.findOne({ _id: userId });
  if (!isUserExist) {
    throw new Error('User not found');
  }
  const userObjectId = new mongoose.Types.ObjectId(userId);
  payload.userId = userObjectId;
  const orderData = {
    ...payload,
    totalPrice: payload.products.reduce(
      (acc, product) => acc + product.price,
      0,
    ),
    userId: userObjectId,
  };
  console.log(orderData);
  const result = await Order.create(orderData);
  console.log(result);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
