import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db, users } from '../../db/index';
import { SignUpSchemaType } from '../../../../shared/schema/signup.schema';

type ExtendedSignUpSchemaType = SignUpSchemaType & {
  avatarUrl?: string;
};

export const signupUser = async (data: ExtendedSignUpSchemaType) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const [user] = await db
    .insert(users)
    .values({
      fullName: data.name,
      email: data.email,
      passwordHash: hashedPassword,
      avatarUrl: data.avatarUrl,
    })
    .returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
    });

  return user;
};
