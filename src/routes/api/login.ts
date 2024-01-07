import { setCookie } from '$std/http/cookie.ts';
import { loginSchema } from '$utils/db/auth-schema.ts';
import { db } from '$utils/db/drizzle.ts';
import { lucia } from '$utils/db/lucia.ts';
import { kv } from '$utils/entry-api/fetch.ts';
import { compare } from 'bcrypt';
import type { Cookie } from 'oslo/cookie';

interface ConnectSession {
	id: string;
	code: string;
	date: number;
}

export async function handler(req: Request): Promise<Response> {
	const form = await req.formData();
	const parseRes = loginSchema.safeParse(Object.fromEntries(form));

	if (!parseRes.success)
		return Response.json(
			{
				success: false,
				errors: parseRes.error.issues.map((issue) => issue.message),
			},
			{ status: 400 },
		);

	const { username, password } = parseRes.data;

	try {
		const user = await db.query.userTable.findFirst({
			where: (user, { eq }) => eq(user.username, username),
		});
		if (!user)
			return Response.json({
				success: false,
				message: '아이디 또는 비밀번호가 일치하지 않아요.',
			});

		const passwordValid = await compare(password, user.password);
		if (!passwordValid) {
			return Response.json({
				success: false,
				message: '아이디 또는 비밀번호가 일치하지 않아요.',
			});
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie: Cookie = lucia.createSessionCookie(session.id);
		const res = Response.json({ success: true });

		setCookie(res.headers, {
			name: sessionCookie.name,
			value: sessionCookie.value,
			...sessionCookie.attributes,
			sameSite: sessionCookie.attributes.sameSite
				? (`${sessionCookie.attributes.sameSite
						.at(0)
						?.toUpperCase()}${sessionCookie.attributes.sameSite.slice(1)}` as
						| 'Strict'
						| 'Lax'
						| 'None')
				: undefined,
		});

		await kv.delete(['verifiedSession', user.entryId]);

		return res;
	} catch (err) {
		console.log(err);
	}

	return Response.json({ success: false }, { status: 500 });
}
