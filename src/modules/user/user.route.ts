import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';
const router = express.Router();
router.post(
  '/',

  UserControllers.createUser,
);

export const UserRoutes = router;
