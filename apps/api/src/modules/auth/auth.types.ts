import { User } from '../../db';
import type { SignUpSchemaType } from '../../../../shared/schema/signup.schema';
export type { loginSchemaType } from '../../../../shared/schema/login.schema';
export type ExtendedSignUpSchemaType = SignUpSchemaType & {
  avatarUrl?: string;
};

export type SignupResponseType = {
  email: string;
};

export type UserInfo = Omit<User, 'passwordHash' | 'refreshToken'>;

export type LoginResponseType = {
  userInfo: UserInfo;
  accessToken: string;
};
