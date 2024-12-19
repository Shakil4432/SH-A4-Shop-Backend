import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['user', 'admin']),
    isBlocked: z.boolean(),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
