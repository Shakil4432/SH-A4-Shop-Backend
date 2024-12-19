import { ErrorRequestHandler } from 'express';
import { TErrorResponse } from '../modules/interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
    error: {
      details: err,
    },
    stack: err?.stack || null,
  });
};

export default globalErrorHandler;
