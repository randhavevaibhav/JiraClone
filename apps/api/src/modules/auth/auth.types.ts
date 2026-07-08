import type { SignUpSchemaType } from '../../../../shared/schema/signup.schema';
export type { loginSchemaType } from '../../../../shared/schema/login.schema';
export type ExtendedSignUpSchemaType = SignUpSchemaType & {
  avatarUrl?: string;
};
