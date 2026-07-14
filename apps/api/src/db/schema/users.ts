import { InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const USER_ROLES = {
  MEMBER: 'member',
  ADMIN: 'admin',
  OWNER: 'owner',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  fullName: text('full_name').notNull(),

  email: text('email').unique().notNull(),

  passwordHash: text('password_hash').notNull(),

  avatarUrl: text('avatar_url'),

  role: text('role').$type<UserRole>().notNull().default(USER_ROLES.MEMBER),

  refreshToken: text('refreshToken').unique(),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
