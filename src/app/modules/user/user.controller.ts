import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../errors/AppError';
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
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userDataFromDB = await User.findById(id);
  console.log('userDataFromDB', userDataFromDB);
  const userDataFromToken = req.user;
  console.log('userDataFromToken', userDataFromToken);
  const { isBlocked, ...remainingData } = req.body;
  console.log(req.body);
  console.log('isBlocked', isBlocked);
  console.log('remainingData', remainingData);
  if (isBlocked && userDataFromToken?.userRole === 'user') {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You aren't authorized");
  }
  // if user is admin: only update isBlocked field
  if (isBlocked && userDataFromToken?.userRole === 'admin') {
    const result = await UserServices.updateUserIntoDB(id, {
      isBlocked: isBlocked,
    });
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User status is updated succesfully',
      data: result,
    });
  }
  // if user is user: update anything except isBlocked field
  if (!isBlocked && userDataFromToken?.userRole === 'user') {
    const result = await UserServices.updateUserIntoDB(id, remainingData);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'User updated succesfully',
      data: result,
    });
  }
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
  updateUser,
  getAllUser,
  getSingleUser,
};
