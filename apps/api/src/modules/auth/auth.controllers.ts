import { Request, Response } from 'express';
import { loginUser, signupUser } from './auth.services';
import { ExtendedSignUpSchemaType, loginSchemaType } from './auth.types';

export const signupController = async (
  req: Request<object, object, ExtendedSignUpSchemaType>,
  res: Response,
) => {
  const signupUserData = req.body;

  const user = await signupUser(signupUserData);

  res.json({
    success: true,
    message: `signup completed for user ${user.fullName} !`,
  });
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
  return res.status(200).send({
    message: `user with mail: ${credentials.email} validated !!!`,
    userInfo,
    accessToken,
  });
};
