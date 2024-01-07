import { graphql } from '$utils/entry-api/graphql.ts';
import { FreshContext } from '$fresh/server.ts';
import { DaisyState } from '../_middleware.ts';
import { kv } from '$utils/entry-api/fetch.ts';

export async function handler(
	_req: Request,
	ctx: FreshContext<DaisyState>,
): Promise<Response> {
	const user = ctx.state.user;
	if (!user) return Response.json({ success: false });

	const res = await graphql<{
		userstatus: {
			id: string;
			username: string;
			nickname: string;
			profileImage: { filename: string; imageType: string } | null;
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
  }
}`,
		{ id: user.entryId },
	);
	if (!res.userstatus) return Response.json({ success: false });

	const entryUser = {
		id: res.userstatus.id,
		username: res.userstatus.username,
		nickname: res.userstatus.nickname,
		profileImage: res.userstatus.profileImage
			? `https://playentry.org/uploads/${res.userstatus.profileImage.filename.slice(
					0,
					2,
			  )}/${res.userstatus.profileImage.filename.slice(2, 4)}/${
					res.userstatus.profileImage.filename
			  }.${res.userstatus.profileImage.imageType}`
			: null,
		updated: Date.now(),
	};

	await kv.set(['entryUser', user.entryId], entryUser);

	return Response.json({ success: true });
}
