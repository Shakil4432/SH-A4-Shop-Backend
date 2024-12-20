import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isUserBlocked(email: string): Promise<boolean>;
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
