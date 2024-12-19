import { AnyZodObject } from 'zod';
import CatchAsync from '../modules/utils/CatchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return CatchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
