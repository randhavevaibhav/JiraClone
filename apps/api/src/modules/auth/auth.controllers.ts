import { Request, Response } from 'express';
import { loginUser, signupUser } from './auth.services';
import {
  ExtendedSignUpSchemaType,
  LoginResponseType,
  loginSchemaType,
  SignupResponseType,
} from './auth.types';
import { Success } from '@/types/api-response';

export const signupController = async (
  req: Request<object, object, ExtendedSignUpSchemaType>,
  res: Response,
) => {
  const signupUserData = req.body;

  const user = await signupUser(signupUserData);

  const response: Success<SignupResponseType> = {
    success: true,
    message: `signup completed !`,
    data: {
      email: user.email,
    },
  };
  res.status(200).send(response);
};

export const loginController = async (
  req: Request<object, object, loginSchemaType>,
  res: Response,
) => {
  const credentials = req.body;
  const { newRefreshToken, userInfo, accessToken } =
    await loginUser(credentials);

  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true,
  });

  const response: Success<LoginResponseType> = {
    success: true,
    message: `user validated !`,
    data: {
      userInfo,
      accessToken,
    },
  };
  return res.status(200).send(response);
};
