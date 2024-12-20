import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../modules/utils/CatchAsync';
import AppError from '../modules/error/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized ');
    }

    jwt.verify(token, config.jwt_secret_key as string, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized ');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
