import { KvCookieJar } from '$utils/entry-api/kv-cookie-jar.ts';
import { wrapFetch } from '$utils/entry-api/wrap-fetch.ts';

export const kv = await Deno.openKv();
const cookies = await kv.get<string[]>(['cookies']).then((v) => v.value ?? []);
const jar = new KvCookieJar(kv, cookies);

const origFetch = globalThis.fetch;
export const fetch = wrapFetch({ cookieJar: jar, fetch: origFetch });
