import { fetch } from '$utils/entry-api/fetch.ts';
import { getTokens } from '$utils/entry-api/tokens.ts';

type Nullable<T> = { [P in keyof T]: T[P] | null };

export async function graphql<T>(
	query: string,
	variables: Record<string, any>,
): Promise<Nullable<T>> {
	const tokens = await getTokens();

	const res = await fetch('https://playentry.org/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(tokens?.csrfToken && { 'csrf-token': tokens.csrfToken }),
			...(tokens?.xToken && { 'x-token': tokens.xToken }),
		},
		body: JSON.stringify({ query, variables }),
	});
	const json: { data: T } = await res.json();

	return json.data;
}
