import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BlogController } from './blog.controller';
const router = express.Router();
router.post('/', auth(USER_ROLE.user), BlogController.createBlog);
router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogController.getSingleBlog,
);
router.get('/', BlogController.getAllBlogs);
router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogController.deleteBlog,
);
router.put('/:id', auth(USER_ROLE.user), BlogController.updateBlog);
export const BlogRoutes = router;
