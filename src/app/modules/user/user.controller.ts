import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  userData.id = uuidv4();
  const result = await UserServices.createUserIntoDB(userData);
  const { _id, name, email } = result;
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered succesfully',
    data: {
      _id,
      name,
      email,
    },
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginDBUser(req.body);
  const { accessToken } = result;
  sendResponse(res, {
    success: true,
    message: 'Login succesfull',
    statusCode: StatusCodes.OK,
    data: { token: accessToken },
  });
});
export const UserController = {
  createUser,
  loginUser,
};
