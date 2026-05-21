import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Full name must be at least 3 characters')
      .max(50, 'Full name cannot exceed 50 characters'),

    email: z
      .string()
      .trim()
      .email('Please enter a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(
        /[A-Z]/,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        /[a-z]/,
        'Password must contain at least one lowercase letter',
      )
      .regex(
        /[0-9]/,
        'Password must contain at least one number',
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    },
  );

export type SignUpFormData = z.infer<
  typeof signUpFormSchema
>;