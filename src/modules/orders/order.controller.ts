import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { OrderServices } from './order.service';

export const createOrder = CatchAsync(async (req, res) => {
  console.log(req.body);
  const user = req.user;
  console.log(user);
  const order = await OrderServices.createOrderIntoDB(req.body, user?.id);
  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: 201,
    data: order,
  });
});

export const OrderControllers = {
  createOrder,
};
