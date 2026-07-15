import { type ExtendedSignUpSchemaType } from '../modules/auth/auth.types';
export const createSignupUserDto = (
  overrides?: Partial<ExtendedSignUpSchemaType>,
): ExtendedSignUpSchemaType => {
  return {
    email: 'testvaibhav@gmail.com',
    password: '123456aA',
    name: 'vaibhav',
    ...overrides,
  };
};
