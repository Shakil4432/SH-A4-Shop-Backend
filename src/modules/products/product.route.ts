import express from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidations } from './product.validation';
const router = express.Router();
router.post(
  '/create-product',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidations.productValidationSchema),
  ProductControllers.createProduct,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  ProductControllers.getAllProduct,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);
export const ProductRoutes = router;
