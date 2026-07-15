import { and, eq } from 'drizzle-orm';
import { db, users } from '../db/index';
import type { User } from '../db/index';
import { ExtendedSignUpSchemaType } from '../modules/auth/auth.types';

type MutableUserColumn = Exclude<
  keyof User,
  'id' | 'passwordHash' | 'createdAt' | 'role'
>;

async function checkIfUserExist(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

async function insert({
  userData,
  hashedPassword,
}: {
  userData: ExtendedSignUpSchemaType;
  hashedPassword: string;
}) {
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
}

async function get<K extends keyof User>({
  userId,
  column,
}: {
  userId: string;
  column: K;
}) {
  return (await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      [column]: true,
    },
  })) as Promise<Pick<User, K> | undefined>;
}

//// can update only members. Update Admin and owner users manually.
async function update<K extends MutableUserColumn>({
  userId,
  column,
  value,
}: {
  userId: string;
  column: K;
  value: User[K];
}) {
  return await db
    .update(users)
    .set({
      [column]: value,
    })
    .where(and(eq(users.id, userId), eq(users.role, 'member')))
    .returning({
      id: users.id,
    });
}

// can delete only members. Delete Admin and owner users manually.
async function remove(userId: string) {
  return await db
    .delete(users)
    .where(and(eq(users.id, userId), eq(users.role, 'member')))
    .returning({
      id: users.id,
    });
}

export const userRepository = {
  checkIfUserExist,
  insert,
  update,
  remove,
  get,
};
