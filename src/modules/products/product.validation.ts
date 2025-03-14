import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    brand: z.string({ required_error: 'model is required' }),
    price: z.number({ required_error: 'price is required' }),
    model: z.string({ required_error: 'model is required' }),
    stock: z.number().default(0),
    image: z.string().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    brand: z.string({ required_error: 'model is required' }).optional(),
    price: z.number({ required_error: 'price is required' }).optional(),
    model: z.string({ required_error: 'model is required' }).optional(),
    stock: z.number().default(0).optional(),
    image: z.string().optional(),
  }),
});

export const ProductValidations = {
  productValidationSchema,
  updateProductValidationSchema,
};
