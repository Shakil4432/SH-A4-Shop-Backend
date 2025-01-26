import { UserServices } from './user.service';
import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = CatchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

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
  createUser,
  getAllUsers,
};
