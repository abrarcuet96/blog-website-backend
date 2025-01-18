import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required').optional(),
    name: z.string().min(1, 'Name is required').trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});
export const updateUserValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required').optional().optional(),
    name: z.string().min(1, 'Name is required').trim().optional(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
