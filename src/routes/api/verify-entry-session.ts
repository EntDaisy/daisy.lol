import { verifyEntrySessionSchema } from '$utils/db/auth-schema.ts';
import { kv } from '$utils/entry-api/fetch.ts';
import { graphql } from '$utils/entry-api/graphql.ts';

export interface ConnectSession {
	id: string;
	code: string;
	date: number;
}

export async function handler(req: Request): Promise<Response> {
	const form = await req.json();
	const parseRes = verifyEntrySessionSchema.safeParse(form);

	if (!parseRes.success)
		return Response.json(
			{
				success: false,
				errors: parseRes.error.issues.map((issue) => issue.message),
			},
			{ status: 400 },
		);

	const { entryId } = parseRes.data;

	const session = await kv
		.get<ConnectSession>(['connectSession', entryId])
		.then((s) => s.value);
	if (!session)
		return Response.json({
			success: false,
			message: '존재하지 않는 세션이에요.',
		});
	const comments = await graphql<{
		commentList: {
			list: {
				id: string;
				user: { id: string };
				content: string;
				created: string;
			}[];
		};
	}>(
		`query ($pageParam: PageParam, $target: String){
        commentList(pageParam: $pageParam, target: $target) {
          list {
            id
            user { id }
            content
            created
          }
        }
      }`,
		{
			pageParam: { display: 20, order: -1 },
			target: Deno.env.get('VERIFY_ID'),
		},
	);

	const latestCommentByUser = comments.commentList?.list.find(
		(c) => c.user.id === session.id,
	);
	if (
		!latestCommentByUser ||
		new Date(latestCommentByUser.created).valueOf() - session.date < 0 ||
		latestCommentByUser.content.trim() !== session.code
	)
		return Response.json({
			success: false,
			message: '인증 메시지를 찾지 못했어요.',
		});

	await Promise.all([
		kv.delete(['connectSession', entryId]),
		kv.set(['verifiedSession', entryId], session, {
			expireIn: 3 * 60 * 60 * 1000,
		}),
	]);

	return Response.json({ success: true });
}
