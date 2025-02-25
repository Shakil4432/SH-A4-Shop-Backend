import express from 'express';
import { CartControllers } from './cart.controller';
import validateRequest from '../../middleware/validateRequest';
import { CartValidations } from './cart.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();





// Add item to cart (Only users, not admins)
router.post(
  '/',
  auth(USER_ROLE.user,USER_ROLE.admin),
  validateRequest(CartValidations.CartSchema),
  CartControllers.creatCart
);

// Get user's cart
router.get('/:userId', auth(USER_ROLE.user,USER_ROLE.admin), CartControllers.getCart);

// Remove a specific item from cart
router.delete('/:userId/:productId',auth(USER_ROLE.user,USER_ROLE.admin), CartControllers.removeFromCart);

// Clear entire cart
router.delete('/:userId', auth(USER_ROLE.user,USER_ROLE.admin), CartControllers.clearCart);

export const CartRoutes = router;

