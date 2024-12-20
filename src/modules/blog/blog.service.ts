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

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

const updateBlogIntoDB = async (
  id: string,
  userId: string,
  payload: Partial<TBlog>,
) => {
  const result = await Blog.findOneAndUpdate(
    { _id: id, author: userId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are  not able to update this blog',
    );
  }
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
};
