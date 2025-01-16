import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
}
export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
