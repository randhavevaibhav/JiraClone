import { eq } from 'drizzle-orm';
import { db, users } from '../../db/index';
import { ExtendedSignUpSchemaType } from './auth.types';

export const checkIfUserExist = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const insertNewUser = async (
  userData: ExtendedSignUpSchemaType,
  hashedPassword: string,
) => {
  const [newUser] = await db
    .insert(users)
    .values({
      fullName: userData.name,
      email: userData.email,
      passwordHash: hashedPassword,
      avatarUrl: userData.avatarUrl,
    })
    .returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
    });

  return newUser;
};

export const getUserRefreshToken = async (userId: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      refreshToken: true,
    },
  });
};

export const updateUserRefreshToken = async (
  userId: string,
  refreshToken: string,
) => {
  return await db
    .update(users)
    .set({
      refreshToken,
    })
    .where(eq(users.id, userId));
};
