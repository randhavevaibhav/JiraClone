import bcrypt from 'bcrypt';
import type { ExtendedSignUpSchemaType, loginSchemaType } from './auth.types';
import jwt from 'jsonwebtoken';
import { userRepository } from '../../repository/user.repository';
import {
  ConflictError,
  UnAuthorizedError,
  ForbiddenError,
} from '../../errors/errors';

const isTokenExpired = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new UnAuthorizedError('Invalid or expired refresh token');
  }
};

export const signupUser = async (userData: ExtendedSignUpSchemaType) => {
  const user = await userRepository.checkIfUserExist(userData.email);
  if (user && user.email) {
    throw new ConflictError('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await userRepository.insert({ userData, hashedPassword });
  return newUser;
};

export const loginUser = async (credentials: loginSchemaType) => {
  const { email, password } = credentials;
  const user = await userRepository.checkIfUserExist(email);

  if (!user) {
    throw new UnAuthorizedError('Invalid email or password');
  }
  const isPassMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isPassMatch) {
    throw new UnAuthorizedError('Invalid email or password');
  }

  const token = await userRepository.get({
    userId: user.id,
    column: 'refreshToken',
  });

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

  await userRepository.update({
    userId: user.id,
    column: 'refreshToken',
    value: newRefreshToken,
  });

  return {
    userInfo,
    accessToken,
    newRefreshToken,
  };
};
