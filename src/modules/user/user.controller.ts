import { UserServices } from './user.service';
import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import httpStatus from 'http-status';



const getAllUsers = CatchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    success: true,
    message: 'All users retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const UserControllers = {
  
  getAllUsers,
};
