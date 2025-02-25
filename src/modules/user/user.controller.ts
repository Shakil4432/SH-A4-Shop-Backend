import { UserServices } from './user.service';
import CatchAsync from '../utils/CatchAsync';
import { sendResponse } from '../utils/sendResponse';
import httpStatus from 'http-status';



const getAllUsers = CatchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    message: 'All users retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleUser = CatchAsync(async (req, res) => {
  console.log(req.params)
  const email = req.params.email
  const result = await UserServices.getSingleUserFromDB(email);
  sendResponse(res, {
    success: true,
    message: 'Single user retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  getAllUsers,
};
