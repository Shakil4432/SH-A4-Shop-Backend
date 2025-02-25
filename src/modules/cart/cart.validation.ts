import { z } from 'zod';
import { Types } from 'mongoose';

const CartItemSchema = z.object({
  productId: z.string().refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid productId format',
  }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const CartSchema = z.object({
  body: z.object({
    items: z
      .array(CartItemSchema)
      .min(1, { message: 'At least one item is required' }),
  }),
});

export const CartValidations = {
  CartSchema,
};
