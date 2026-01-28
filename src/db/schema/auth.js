import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, boolean, index, unique } from "drizzle-orm/pg-core";
const timestamps = {
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().$onUpdate(() => new Date().toISOString()).notNull()
};
// Role enum for user roles
export const roleEnum = pgEnum('role', ['student', 'teacher', 'admin']);
// User table
export const user = pgTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    name: text('name'),
    role: roleEnum('role').default('student').notNull(),
    imageCldPubId: text('image_cld_pub_id'),
    ...timestamps
}, (table) => ({
    emailIdx: index('user_email_idx').on(table.email),
}));
// Session table
export const session = pgTable('session', {
    id: text('id').primaryKey(),
    token: text('token').notNull().unique(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    ...timestamps
}, (table) => ({
    userIdIdx: index('session_user_id_idx').on(table.userId),
    tokenIdx: index('session_token_idx').on(table.token),
}));
// Account table
export const account = pgTable('account', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    password: text('password'),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    expiresAt: timestamp('expires_at', { mode: 'string' }),
    ...timestamps
}, (table) => ({
    userIdIdx: index('account_user_id_idx').on(table.userId),
    accountIdIdx: unique('account_account_id_unique').on(table.accountId, table.providerId),
}));
// Verification table
export const verification = pgTable('verification', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
    ...timestamps
}, (table) => ({
    identifierIdx: index('verification_identifier_idx').on(table.identifier),
    tokenIdx: index('verification_token_idx').on(table.token),
}));
// Relations
export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}));
export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));
export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));
//# sourceMappingURL=auth.js.map