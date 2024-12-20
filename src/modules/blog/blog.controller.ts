import { User } from '../user/user.model';
import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = CatchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);
  const authorData = await User.findById(req.body.author);
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
  console.log(req.user);
  const result = await BlogServices.getAllBlogFromDB();
  sendResponse(res, {
    success: true,
    message: 'All blogs retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlog,
};
