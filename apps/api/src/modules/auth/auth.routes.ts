import { zodValidate } from '../../middlewares/zod.validate.middleware';
import { Router } from 'express';
import { signUpSchema } from '../../../../shared/schema/signup.schema';
import { signupController, loginController } from './auth.controllers';
import { loginSchema } from '../../../../shared/schema/login.schema';

const router = Router();

router.post('/signup', zodValidate(signUpSchema), signupController);
router.post('/login', zodValidate(loginSchema), loginController);

export default router;
