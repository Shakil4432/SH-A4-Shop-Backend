import { Blog } from '../blog/blog.model';
import AppError from '../error/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const updateUserByAdmin = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  return result;
};

const deleteBlogFromDB = async (
  id: string,
  userId: string,
  isAdmin: boolean,
) => {
  console.log(id, userId, isAdmin);
  if (isAdmin) {
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }
    return result;
  } else {
    const result = await Blog.findOneAndDelete({ _id: id, author: userId });
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "You can't delete this blog ");
    }
    return result;
  }
};

export const AdminServices = {
  updateUserByAdmin,
  deleteBlogFromDB,
};
