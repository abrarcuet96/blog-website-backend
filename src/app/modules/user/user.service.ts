import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const blockUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const getAllUserfromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserfromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const loginDBUser = async (payload: TUser) => {
  // checking if the user exsist in db:
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  // checking if the user is blocked:
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  const jwtPayload = {
    userId: user?._id as mongoose.Types.ObjectId,
    userRole: user?.role as string,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return { accessToken };
};
export const UserServices = {
  createUserIntoDB,
  loginDBUser,
  blockUserIntoDB,
  getAllUserfromDB,
  getSingleUserfromDB,
};
