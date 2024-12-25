import mongoose, { Mongoose, ObjectId } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../error/AppError';
import { searchAbleFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';

const createBlogIntoDB = async (userId: string, payload: TBlog) => {
  payload.author = new mongoose.Types.ObjectId(userId);
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort();

  const result = await blogsQuery.modelQuery;
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
