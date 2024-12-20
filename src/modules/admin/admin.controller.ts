import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status';

const updateUserByAdmin = CatchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await AdminServices.updateUserByAdmin(userId);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

export const deleteBlog = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const userRole = req.user?.role;

  const isAdmin = userRole === 'admin';
  const blog = await AdminServices.deleteBlogFromDB(id, userId, isAdmin);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminControllers = {
  updateUserByAdmin,
  deleteBlog,
};
