import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidationSchema } from './user.validation';
const router = express.Router();
router.post(
  '/register',
  validateRequest(userValidationSchema),
  UserController.createUser,
);
router.post('/login', UserController.loginUser);
router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getAllUser);
export const UserRoutes = router;
