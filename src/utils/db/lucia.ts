import { db } from '$utils/db/drizzle.ts';
import { sessionTable, userTable } from '$utils/db/schema.ts';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: Deno.env.get('DENO_DEPLOYMENT_ID') !== undefined,
		},
	},
	getUserAttributes(attributes) {
		return {
			id: attributes.id,
			username: attributes.username,
			nickname: null as unknown as string,
			profileImage: null as string | null,
			createdAt: attributes.createdAt,
			entryId: attributes.entryId,
			updated: undefined as number | undefined,
		};
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	username: string;
	createdAt: number;
	entryId: string;
}
