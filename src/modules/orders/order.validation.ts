import { z } from 'zod';

export const OrderValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        name: z.string({ required_error: 'name is required' }),
        brand: z.string({ required_error: 'model is required' }),
        price: z.number({ required_error: 'price is required' }),
        model: z.string({ required_error: 'model is required' }),
        stock: z.number().default(0),
      }),
    ),

    status: z.enum(['Pending', 'Shipping']).default('Pending'),
  }),
});

export const OrderValidations = {
  OrderValidationSchema,
};
