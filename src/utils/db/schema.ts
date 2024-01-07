import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	createdAt: integer('created_at').notNull(),
	entryId: text('entry_id').notNull(),
});

export const userTableRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	items: many(itemTable),
	rooms: many(directRoomTable),
	messages: many(directMessageTable),
}));

export const sessionTable = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull(),
});

export const sessionTableRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id],
	}),
}));

export const itemTable = sqliteTable('item', {
	id: text('id').primaryKey(),
	type: text('type').notNull(),
	icon: text('icon').notNull(),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	description: text('description').notNull(),
	gist: text('gist').notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	createdAt: integer('created_at').notNull(),
	stars: integer('stars').notNull().default(0),
});

export const itemTableRelations = relations(itemTable, ({ one }) => ({
	user: one(userTable, {
		fields: [itemTable.userId],
		references: [userTable.id],
	}),
}));

export const directRoomTable = sqliteTable('direct_room', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	createdAt: integer('created_at').notNull(),
});

export const directRoomTableRelations = relations(
	directRoomTable,
	({ many }) => ({
		members: many(userTable),
		messages: many(directMessageTable),
	}),
);

export const directMessageTable = sqliteTable('direct_message', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	roomId: text('room_id')
		.notNull()
		.references(() => directRoomTable.id),
	content: text('content').notNull(),
	image: text('image'),
	createdAt: integer('created_at').notNull(),
});

export const directMessageTableRelations = relations(
	directMessageTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [directMessageTable.userId],
			references: [userTable.id],
		}),
		room: one(directRoomTable, {
			fields: [directMessageTable.roomId],
			references: [directRoomTable.id],
		}),
	}),
);
