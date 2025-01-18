import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import User from './user.model';
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
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userDataFromDB = await User.findById(userId);
  console.log('userDataFromDB', userDataFromDB, userId);
  const userDataFromToken = req.user;
  console.log('userDataFromToken', userDataFromToken);
  const { isBlocked, ...remainingData } = req.body;
  console.log(req.body);
  console.log('isBlocked', isBlocked);
  console.log('remainingData', remainingData);

  const result = await UserServices.blockUserIntoDB(userId, {
    isBlocked: isBlocked,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User status is updated succesfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserfromDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserfromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
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
  blockUser,
  getAllUser,
  getSingleUser,
};
