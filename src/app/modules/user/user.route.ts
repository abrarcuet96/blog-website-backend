import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
const router = express.Router();
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.put(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.updateUser,
);
router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getAllUser);
export const UserRoutes = router;
