import { kv } from '$utils/entry-api/fetch.ts';
import { graphql } from '$utils/entry-api/graphql.ts';

export interface EntryUser {
	id: string;
	username: string;
	nickname: string;
	profileImage: string | null;
	updated?: number;
}

export async function getUser(id: string): Promise<EntryUser | null> {
	const savedUser = await kv.get<EntryUser>(['entryUser', id]);
	if (savedUser.value) return savedUser.value;

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
		{ id },
	);
	if (!res.userstatus) return null;

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

	await kv.set(['entryUser', id], entryUser);
	return entryUser;
}
