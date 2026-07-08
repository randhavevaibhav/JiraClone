import { zodValidate } from '../../middlewares/zod.validate.middleware';
import { Router } from 'express';
import { signUpSchema } from '../../../../shared/schema/signup.schema';
import { signupController } from './auth.controllers';

const router = Router();

router.post('/signup', zodValidate(signUpSchema), signupController);

export default router;
