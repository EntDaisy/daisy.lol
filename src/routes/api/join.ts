import { setCookie } from '$std/http/cookie.ts';
import { joinSchema } from '$utils/db/auth-schema.ts';
import { db } from '$utils/db/drizzle.ts';
import { lucia } from '$utils/db/lucia.ts';
import { userTable } from '$utils/db/schema.ts';
import { kv } from '$utils/entry-api/fetch.ts';
import { graphql } from '$utils/entry-api/graphql.ts';
import { hashSync } from 'bcrypt';
import { generateId } from 'lucia';

interface ConnectSession {
	id: string;
	code: string;
	date: number;
}

export async function handler(req: Request): Promise<Response> {
	try {
		const form = await req.formData();
		const parseRes = joinSchema.safeParse(Object.fromEntries(form));

		if (!parseRes.success)
			return Response.json(
				{
					success: false,
					errors: parseRes.error.issues.map((issue) => issue.message),
				},
				{ status: 400 },
			);

		const { username, password, entryId, code } = parseRes.data;

		const connectSession = await kv
			.get<ConnectSession>(['verifiedSession', entryId])
			.then((s) => s.value);
		if (!connectSession || connectSession.code !== code)
			return Response.json(
				{ success: false, message: '인증되지 않은 세션이에요.' },
				{ status: 403 },
			);

		const userId = generateId(15);
		const hashedPassword = hashSync(password);

		const userRes = await graphql<{
			userstatus: {
				id: string;
				username: string;
				nickname: string;
				profileImage: { filename: string; imageType: string } | null;
				coverImage: { filename: string; imageType: string } | null;
			};
		}>(
			`query ($id: String) {
    userstatus(id: $id) {
      id
      username
      nickname
      profileImage {
        filename
        imageType
      }
      coverImage {
        filename
        imageType
      }
    }
  }`,
			{ id: entryId },
		);
		if (!userRes.userstatus)
			return Response.json(
				{ success: false, message: '엔트리 계정이 존재하지 않아요.' },
				{ status: 400 },
			);

		const entryUser = {
			id: userRes.userstatus.id,
			username: userRes.userstatus.username,
			nickname: userRes.userstatus.nickname,
			profileImage: userRes.userstatus.profileImage
				? `https://playentry.org/uploads/${userRes.userstatus.profileImage.filename.slice(
						0,
						2,
				  )}/${userRes.userstatus.profileImage.filename.slice(2, 4)}/${
						userRes.userstatus.profileImage.filename
				  }.${userRes.userstatus.profileImage.imageType}`
				: null,
			coverImage: userRes.userstatus.coverImage
				? `https://playentry.org/uploads/${userRes.userstatus.coverImage.filename.slice(
						0,
						2,
				  )}/${userRes.userstatus.coverImage.filename.slice(2, 4)}/${
						userRes.userstatus.coverImage.filename
				  }.${userRes.userstatus.coverImage.imageType}`
				: null,
			updated: Date.now(),
		};

		const [session] = await Promise.all([
			db
				.insert(userTable)
				.values({
					id: userId,
					username,
					password: hashedPassword,
					entryId,
					createdAt: Date.now(),
				})
				.then(() => lucia.createSession(userId, {})),
			kv.set(['entryUser', entryId], entryUser),
		]);
		const sessionCookie = lucia.createSessionCookie(session.id);
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

		await kv.delete(['verifiedSession', entryId]);

		return res;
	} catch (err) {
		if (err.name === 'LibsqlError' && err.code === 'SQLITE_CONSTRAINT') {
			if (err.message.includes('user.username')) {
				return Response.json(
					{
						success: false,
						message: '이미 사용 중인 아이디에요.',
					},
					{ status: 409 },
				);
			}
			if (err.message.includes('user.entry_id')) {
				return Response.json(
					{
						success: false,
						message: '이미 다른 계정과 연동된 엔트리 계정이에요.',
					},
					{ status: 409 },
				);
			}
		}
		console.log(err);
	}

	return Response.json({ success: false }, { status: 500 });
}
