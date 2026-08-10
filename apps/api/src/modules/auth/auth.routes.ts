import { zodValidate } from '../../middlewares/zod.validate.middleware';
import { signUpSchema } from '../../../../shared/schema/signup.schema';
import { signupController, loginController } from './auth.controllers';
import { loginSchema } from '../../../../shared/schema/login.schema';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import { asyncHandler } from '../../middlewares/async-handler';
import { ApiModule } from '../../types/route';

const signupSwaggerDoc: RouteConfig = {
  method: 'post',
  path: '/signup',
  tags: ['Auth'],
  summary: 'Register a new user.',
  request: {
    body: {
      description: 'The JSON user onboarding profile credentials',
      required: true,
      content: {
        'application/json': {
          schema: signUpSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Creates a new user profile in the database.',

      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.object({
              email: z.email(),
            }),
          }),
        },
      },
    },
  },
};

const loginSwaggerDoc: RouteConfig = {
  method: 'post',
  path: '/login',
  tags: ['Auth'],
  summary: 'Authenticate a user.',
  request: {
    body: {
      description: 'The JSON user login profile credentials',
      required: true,
      content: {
        'application/json': {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description:
        'Verifies user credentials (email and password) and returns a JSON Web Token (JWT) alongside user profile details.',

      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.object({
              userInfo: z.object(),
              accessToken: z.string(),
            }),
          }),
        },
      },
    },
  },
};

export const authModule: ApiModule = {
  basePath: '/auth',
  routes: [
    {
      swagger: signupSwaggerDoc,
      middlewares: [zodValidate(signUpSchema)],
      handler: asyncHandler(signupController),
    },
    {
      swagger: loginSwaggerDoc,
      middlewares: [zodValidate(loginSchema)],
      handler: asyncHandler(loginController),
    },
  ],
};
