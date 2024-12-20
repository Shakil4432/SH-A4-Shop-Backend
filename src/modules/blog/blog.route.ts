import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidations } from './blog.validation';
const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.blogValidationSchema),
  BlogControllers.createBlog,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BlogControllers.getAllBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);
export const BlogRoutes = router;
