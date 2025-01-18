import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogController.createBlog,
);
router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogController.getSingleBlog,
);
router.get('/', BlogController.getAllBlogs);
router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);
router.put(
  '/:id',
  validateRequest(BlogValidation.updateBlogValidationSchema),
  auth(USER_ROLE.user),
  BlogController.updateBlog,
);
export const BlogRoutes = router;
