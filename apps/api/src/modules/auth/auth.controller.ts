import { Request, Response } from 'express';
import { ExtendedSignUpSchemaType, signupUser } from './auth.service';

export const signupController = async (
  req: Request<object, object, ExtendedSignUpSchemaType>,
  res: Response,
) => {
  const signupUserData: ExtendedSignUpSchemaType = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatarUrl: req.body.avatarUrl,
  };

  const user = await signupUser(signupUserData);

  res.json({
    success: true,
    message: `signup completed for user ${user.fullName} !`,
  });
};
