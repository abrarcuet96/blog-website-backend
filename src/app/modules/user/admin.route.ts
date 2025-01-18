import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from '../blog/blog.controller';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { updateUserValidationSchema } from './user.validation';
const router = express.Router();
router.put(
  '/users/:userId/block',
  validateRequest(updateUserValidationSchema),
  auth(USER_ROLE.admin),
  UserController.blockUser,
);
router.delete('/blogs/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);
export const AdminRoutes = router;
