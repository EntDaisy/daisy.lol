import type { EntryUser } from '$utils/entry-api/get-user.ts';
import type { EntryRes } from '$utils/entry-api/types.d.ts';
import { useSignal, useSignalEffect } from '@preact/signals';
import copy from 'copy-to-clipboard';
import { useEffect } from 'preact/hooks';
import { Input } from '../../components/common/input.tsx';
import { Logo } from '../../components/common/logo.tsx';
import { AccountBox } from './account-box.tsx';
import { authPage } from './modal.tsx';

interface JoinProps {
	verifyId: string;
}

const cache = new Map<string, EntryUser>();

export function Join({ verifyId }: JoinProps) {
	const username = useSignal('');
	const password = useSignal('');
	const entryId = useSignal('');
	const code = useSignal('');

	const showCopied = useSignal(false);
	const showVerifyFailed = useSignal(false);
	const verified = useSignal(false);
	const verifying = useSignal(false);

	const entryUser = useSignal<EntryUser | null>(null);

	const editing = useSignal(false);
	const showBox = !!entryUser.value && !editing.value;
	const errorMessage = useSignal('');

	useEffect(() => {
		if (editing.value) {
			editing.value = false;
			entryUser.value = null;
		}
	}, [entryId.value]);

	useSignalEffect(() => {
		if (!entryId.value) return;
		if (cache.has(entryId.value)) {
			entryUser.value = cache.get(entryId.value)!;
		}

		const controller = new AbortController();
		const uuid = crypto.randomUUID();

		code.value = uuid;

		fetch('/api/create-entry-session', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ entryId: entryId.value, code: code.value }),
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((res: EntryRes<EntryUser>) => {
				if (res.success) entryUser.value = res.data ?? null;
			});

		return () => controller.abort();
	});

	return (
		<form
			class='flex flex-col items-center px-8'
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await fetch('/api/join', {
					method: 'POST',
					body: new FormData(e.target as HTMLFormElement),
				}).then((res) => res.json());
				if (res.success) location.reload();
				else if (res.message) errorMessage.value = res.message;
			}}
		>
			<div class='flex items-center gap-x-2 px-2 mt-6'>
				<Logo class='w-[34px] h-[34px]' />
				<h1
					class='font-display font-semibold text-white text-[26px]
            transition-colors duration-300 ease-in-out'
				>
					Daisy
				</h1>
			</div>
			{errorMessage.value && (
				<div class='font-medium bg-red-950/70 text-red-500 w-full mt-3 px-3.5 py-2.5 border border-red-950 rounded-xl'>
					{errorMessage.value}
				</div>
			)}
			<label class='w-full mt-2'>
				<span
					class='font-medium text-zinc-400 text-sm leading-4
            transition-colors duration-300 ease-in-out'
				>
					아이디
				</span>
				<Input
					name='username'
					placeholder='gildong'
					minLength={4}
					maxLength={32}
					value={username.value}
					onInput={(e) => {
						username.value = (e.target as HTMLInputElement).value;
					}}
					autoFocus
					required
				/>
			</label>
			<label class='w-full mt-2'>
				<span
					class='font-medium text-zinc-400 text-sm leading-4
            transition-colors duration-300 ease-in-out'
				>
					비밀번호
				</span>
				<Input
					name='password'
					type='password'
					placeholder='p@ssw0rd'
					minLength={6}
					maxLength={32}
					value={password.value}
					onInput={(e) => {
						password.value = (e.target as HTMLInputElement).value;
					}}
					required
				/>
			</label>
			<label class='w-full mt-2'>
				<span
					class='font-medium text-zinc-400 text-sm leading-4
            transition-colors duration-300 ease-in-out'
				>
					엔트리 계정
				</span>
				{showBox ? (
					<AccountBox user={entryUser.value!} editing={editing} />
				) : (
					<></>
				)}
				<Input
					name='entryId'
					placeholder='63d2b58a6eee8900566ee93a'
					containerClass={showBox ? 'hidden' : undefined}
					minLength={24}
					maxLength={24}
					value={entryId.value}
					onInput={(e) => {
						entryId.value = (e.target as HTMLInputElement).value;
					}}
					required
				/>
			</label>
			<label
				class='w-full mt-2 data-[hidden]:hidden'
				data-hidden={!showBox ? true : undefined}
			>
				<span
					class='font-medium text-zinc-400 text-sm leading-4
            transition-colors duration-300 ease-in-out'
				>
					인증 코드
				</span>
				<div class='flex'>
					<div class='flex w-full relative'>
						<input
							name='code'
							class='flex items-center w-full h-[42px] px-3
                font-semibold bg-zinc-900 border border-zinc-800
                rounded-xl cursor-pointer focus:outline-none'
							onClick={() => {
								copy(code.value);
								showCopied.value = true;
								setTimeout(() => {
									showCopied.value = false;
								}, 3000);
							}}
							value={code.value}
							readOnly
							required
						/>
						<span
							class={`absolute flex items-center justify-center top-0 left-0 w-full h-full px-4
                bg-brand-500/20 text-brand-200 text-center font-display font-medium leading-4
                rounded-xl ${showCopied.value ? 'opacity-100' : 'opacity-0'} backdrop-blur-md
                z-30 pointer-events-none transition-opacity duration-300 ease-in-out`}
						>
							클립보드에 복사되었어요
						</span>
						<span
							class={`absolute flex items-center justify-center top-0 left-0 w-full h-full px-4
                bg-red-500/20 text-red-200 text-center font-display font-medium leading-4
                rounded-xl ${
									showVerifyFailed.value ? 'opacity-100' : 'opacity-0'
								} backdrop-blur-md
                z-30 pointer-events-none transition-opacity duration-300 ease-in-out`}
						>
							댓글에서 인증 코드를 찾을 수 없어요
						</span>
						<span
							class={`absolute flex items-center justify-center top-0 left-0 w-full h-full px-4
                bg-brand-500/20 text-brand-200 text-center font-display font-medium leading-4
                rounded-xl ${verified.value ? 'opacity-100' : 'opacity-0'} backdrop-blur-md
                z-30 pointer-events-none transition-opacity duration-300 ease-in-out`}
						>
							인증이 완료되었어요
						</span>
					</div>
					<button
						type='button'
						class='flex-shrink-0 w-max h-max px-[18px] py-2 ml-2 my-auto
              bg-brand-500 hover:bg-brand-400 disabled:bg-zinc-500
              font-display font-semibold text-white shadow-sm rounded-xl
              cursor-pointer disabled:cursor-not-allowed transition-colors duration-300 ease-in-out'
						onClick={async () => {
							verifying.value = true;

							const res: EntryRes<void> = await fetch(
								'/api/verify-entry-session',
								{
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ entryId: entryId.value }),
								},
							).then((res) => res.json());

							if (res.success) verified.value = true;
							else {
								showVerifyFailed.value = true;
								setTimeout(() => {
									showVerifyFailed.value = false;
								}, 3000);
							}
							verifying.value = false;
						}}
					>
						확인
					</button>
				</div>
			</label>
			{showBox && (
				<div class='w-full font-semibold text-zinc-400 text-sm leading-4 mt-2.5'>
					위 인증 코드를 클릭해 복사하고{'  '}
					<a
						href={`https://playentry.org/community/entrystory/${verifyId}#Write`}
						class='text-brand-400 hover:underline cursor-pointer'
						target='_blank'
						rel='noreferrer'
					>
						이 글
					</a>
					의 댓글로 등록한 뒤, '확인' 버튼을 눌러주세요.
				</div>
			)}
			<button
				type='submit'
				class='font-display font-bold w-full h-max px-[18px] py-2 mt-4 my-auto
          bg-brand-500 hover:bg-brand-400 disabled:bg-zinc-500 text-white leading-7
          rounded-xl shadow-sm focus:outline-none cursor-pointer disabled:cursor-not-allowed
          transition-colors duration-300 ease-in-out'
				disabled={
					!(
						username.value &&
						username.value.length >= 4 &&
						username.value.length <= 32 &&
						password.value &&
						password.value.length >= 6 &&
						password.value.length <= 32 &&
						entryId.value &&
						entryId.value.length === 24 &&
						code.value &&
						code.value.length === 36 &&
						verified.value &&
						!verifying.value
					)
				}
			>
				회원가입
			</button>
			<div class='flex w-full mt-2.5 mb-5 font-medium text-sm'>
				<span class='text-zinc-500'>계정이 있으신가요?&nbsp;</span>
				<button
					type='button'
					class='text-brand-400 hover:underline cursor-pointer'
					onClick={() => {
						authPage.value = 'login';
					}}
				>
					로그인
				</button>
			</div>
		</form>
	);
}
