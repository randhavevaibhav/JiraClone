import bcrypt from 'bcrypt';
import type { ExtendedSignUpSchemaType, loginSchemaType } from './auth.types';
import jwt from 'jsonwebtoken';
import {
  checkIfUserExist,
  getUserRefreshToken,
  insertNewUser,
  updateUserRefreshToken,
} from './auth.dao';
import { ConflictError } from '@/utils/errors/conflict-error';
import { UnAuthorizedError } from '@/utils/errors/un-authorized-error';
import { ForbiddenError } from '@/utils/errors/forbidden-error';

const isTokenExpired = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new UnAuthorizedError('Invalid or expired refresh token');
  }
};

export const signupUser = async (userData: ExtendedSignUpSchemaType) => {
  const user = await checkIfUserExist(userData.email);
  if (user && user.email) {
    throw new ConflictError('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await insertNewUser(userData, hashedPassword);
  return newUser;
};

export const loginUser = async (credentials: loginSchemaType) => {
  const { email, password } = credentials;
  const user = await checkIfUserExist(email);

  if (!user) {
    throw new UnAuthorizedError('Invalid email or password');
  }
  const isPassMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isPassMatch) {
    throw new UnAuthorizedError('Invalid email or password');
  }

  const token = await getUserRefreshToken(user.id);

  if (token) {
    if (
      token.refreshToken &&
      !isTokenExpired(token.refreshToken, process.env.REFRESH_TOKEN_SECRET!)
    ) {
      //invalid session
      throw new ForbiddenError('User already has an active session !');
    }
  }

  const userInfo = {
    userId: user.id,
    userAvatar: user.avatarUrl,
    userEmail: user.email,
    userRole: user.role,
    userCreatedAt: user.createdAt,
  };

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '4m' },
  );
  const newRefreshToken = jwt.sign(
    userInfo,
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '10h',
    },
  );

  await updateUserRefreshToken(user.id, newRefreshToken);

  return {
    userInfo,
    accessToken,
    newRefreshToken,
  };
};
