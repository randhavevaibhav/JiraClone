import { z } from 'zod';
import { signUpSchema } from '@root/shared/schema/signup.schema';
export const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
