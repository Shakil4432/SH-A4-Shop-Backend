import express from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

import validateRequest from '../../middleware/validateRequest';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const router = express.Router();
router.post(
  '/create-order',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(OrderValidations.OrderValidationSchema),
  OrderControllers.createOrder,
);

export const OrderRoutes = router;
