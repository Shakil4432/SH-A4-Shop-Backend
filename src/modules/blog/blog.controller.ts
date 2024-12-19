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

export const BlogControllers = {
  createBlog,
};
