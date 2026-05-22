import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'member',
  'admin',
  'owner',
]);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  fullName: text('full_name').notNull(),

  email: text('email').unique().notNull(),

  passwordHash: text('password_hash').notNull(),

  avatarUrl: text('avatar_url'),

  isEmailVerified: boolean('is_email_verified')
    .notNull()
    .default(false),

  role: userRoleEnum('role')
    .notNull()
    .default('member'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),
});