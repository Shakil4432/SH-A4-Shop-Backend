import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { CartService } from './cart.service';


const creatCart = CatchAsync(async (req, res) => {
  console.log(req.body)
 const userId = req.user?.id
  
  const result = await CartService.addToCartInToDB(req.body, userId);
  sendResponse(res, {
    success: true,
    message: 'item added to cart successfully',
    statusCode: 201,
    data: result,
  });
});

const getCart = CatchAsync(async (req, res) => {
    const userId = req.params.userId;
    const result = await CartService.getCartFromDB(userId);
    console.log(result)
  sendResponse(res, {
    success: true,
    message: 'All cart item retrieve successfully',
    statusCode: 200,
    data: result,
  });
});

const removeFromCart = CatchAsync(async (req, res) => {
    const { userId, productId } = req.params;
    const result = await CartService.removeFromCartFromDB(userId, productId)
  sendResponse(res, {
    success: true,
    message: 'Remove item from cart  successfully',
    statusCode: 200,
    data: result,
  });
});

const clearCart = CatchAsync(async (req, res) => {
    const { userId } = req.params;
    const result= await CartService.clearCartFromDB(userId);
  sendResponse(res, {
    success: true,
    message: 'Product updated successfully',
    statusCode: 200,
    data: result,
  });
});



export const CartControllers = {
  creatCart,
  getCart,
  removeFromCart,
  clearCart,
  
};
