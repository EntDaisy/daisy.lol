import { createEntrySessionSchema } from '$utils/db/auth-schema.ts';
import { kv } from '$utils/entry-api/fetch.ts';
import { getUser } from '$utils/entry-api/get-user.ts';

export interface ConnectSession {
	id: string;
	code: string;
	date: number;
}

export async function handler(req: Request): Promise<Response> {
	const form = await req.json();
	const parseRes = createEntrySessionSchema.safeParse(form);

	if (!parseRes.success)
		return Response.json(
			{
				success: false,
				errors: parseRes.error.issues.map((issue) => issue.message),
			},
			{ status: 400 },
		);

	const { entryId, code } = parseRes.data;

	const res = await getUser(entryId);

	await kv.set(
		['connectSession', entryId],
		{
			id: entryId,
			code,
			date: Date.now(),
		} satisfies ConnectSession,
		{ expireIn: 3 * 60 * 60 * 1000 },
	);

	return Response.json({ success: true, data: res });
}
