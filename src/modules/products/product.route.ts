import express, { NextFunction, Request, Response } from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidations } from './product.validation';
import { upload } from '../utils/sendImageToCloudinary';
const router = express.Router();
router.post(
  '/create-book',
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(ProductValidations.productValidationSchema),
  ProductControllers.createProduct,
);
router.get(
  '/',
  // auth(USER_ROLE.admin, USER_ROLE.user),
  ProductControllers.getAllProduct,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);
export const ProductRoutes = router;
