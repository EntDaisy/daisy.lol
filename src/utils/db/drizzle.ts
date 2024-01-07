import * as schema from '$utils/db/schema.ts';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const libsql = createClient({
	url: Deno.env.get('TURSO_DATABASE_URL') ?? '',
	authToken: Deno.env.get('TURSO_AUTH_TOKEN'),
});

export const db = drizzle(libsql, { schema });
