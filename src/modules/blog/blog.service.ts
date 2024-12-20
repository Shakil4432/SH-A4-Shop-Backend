import AppError from '../error/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';

const createBlogIntoDB = async (payload: TBlog) => {
  const isAuthorExist = await User.findById(payload?.author);
  if (!isAuthorExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Author not found');
  }
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogFromDB = async () => {
  const result = await Blog.find();
  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
};
