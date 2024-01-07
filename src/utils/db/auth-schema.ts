import { z } from 'zod';

const USERNAME_REQUIREMENTS =
	'아이디에는 4~32자의 영문 소문자, 숫자만 사용 가능해요.';
const PASSWORD_REQUIREMENTS =
	'비밀번호에는 6~32자의 영문 소문자, 숫자만 사용 가능해요.';
const ENTRY_ID_REQUIREMENTS =
	'엔트리 아이디는 24자의 영문 소문자, 숫자로만 구성되어 있어요.';

const username = z
	.string()
	.min(4, USERNAME_REQUIREMENTS)
	.max(32, USERNAME_REQUIREMENTS)
	.refine((username) => /^[a-z0-9]*$/.test(username), {
		message: USERNAME_REQUIREMENTS,
	});

const password = z
	.string()
	.min(6, PASSWORD_REQUIREMENTS)
	.max(32, PASSWORD_REQUIREMENTS)
	.refine((username) => /^[a-z0-9]*$/.test(username), {
		message: PASSWORD_REQUIREMENTS,
	});

const entryId = z
	.string()
	.length(24, ENTRY_ID_REQUIREMENTS)
	.refine((username) => /^[a-z0-9]*$/.test(username), {
		message: ENTRY_ID_REQUIREMENTS,
	});

export const joinSchema = z.object({
	username,
	password,
	entryId,
	code: z.string().length(36, '계정 인증 절차가 진행되지 않았어요.'),
});

export const loginSchema = z.object({ username, password });

export const createEntrySessionSchema = z.object({
	entryId,
	code: z.string().length(36, '계정 인증 코드의 형식이 올바르지 않아요.'),
});
export const verifyEntrySessionSchema = z.object({ entryId });
