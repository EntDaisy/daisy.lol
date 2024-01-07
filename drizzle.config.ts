export default {
	schema: './src/utils/db/schema.ts',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		// @ts-ignore
		url: process.env.TURSO_DATABASE_URL,
		// @ts-ignore
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
};
