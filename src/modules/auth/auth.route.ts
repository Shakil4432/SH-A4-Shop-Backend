import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { LoginValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();
router.post(
  '/',
  validateRequest(LoginValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
