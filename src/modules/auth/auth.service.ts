import httpStatus from 'http-status';
import AppError from '../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExist(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (await User.isUserBlocked(payload?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    email: user?.email,
    password: user?.password,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret_key as string, {
    expiresIn: '30d',
  });
  return accessToken;
};

export const AuthServices = {
  loginUser,
};
