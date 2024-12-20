import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middleware/auth';
const router = express.Router();
router.post('/', BlogControllers.createBlog);
router.get('/', auth(), BlogControllers.getAllBlog);
export const BlogRoutes = router;
