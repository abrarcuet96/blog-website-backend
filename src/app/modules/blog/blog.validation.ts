import { Types } from 'mongoose';
import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    author: z
      .instanceof(Types.ObjectId)
      .refine((val) => val instanceof Types.ObjectId, {
        message: 'Author must be a valid ObjectId',
      })
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    author: z
      .instanceof(Types.ObjectId)
      .refine((val) => val instanceof Types.ObjectId, {
        message: 'Author must be a valid ObjectId',
      })
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
