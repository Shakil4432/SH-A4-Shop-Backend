import { User } from '../user/user.model';
import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = CatchAsync(async (req, res) => {
  const id = req.user?.id;
  const result = await BlogServices.createBlogIntoDB(id, req.body);
  const authorData = await User.findById(id);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: authorData,
    },
  });
});

const getAllBlog = CatchAsync(async (req, res) => {
  const query = req.query;

  const result = await BlogServices.getAllBlogsFromDB(query);
  sendResponse(res, {
    success: true,
    message: 'All blogs retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const updateBlog = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await BlogServices.updateBlogIntoDB(id, userId, req.body);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlog,
  updateBlog,
};
