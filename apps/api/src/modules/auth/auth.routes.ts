import { zodValidate } from '../../middlewares/validate.middleware';
import { Router } from 'express';
import { signUpSchema } from '../../../../shared/schema/signup.schema';
import { signupController } from './auth.controller';

const router = Router();

router.post('/signup', zodValidate(signUpSchema), signupController);

export default router;
