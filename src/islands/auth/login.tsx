import { useSignal } from '@preact/signals';
import { Input } from '../../components/common/input.tsx';
import { Logo } from '../../components/common/logo.tsx';
import { authPage } from './modal.tsx';

interface LoginProps {
	redirect?: string;
	useAnchor?: boolean;
}

export function Login({ redirect, useAnchor }: LoginProps) {
	const username = useSignal('');
	const password = useSignal('');

	const errorMessage = useSignal('');

	return (
		<form
			class='flex flex-col items-center px-8'
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await fetch('/api/login', {
					method: 'POST',
					body: new FormData(e.target as HTMLFormElement),
				}).then((res) => res.json());
				if (res.success) {
					if (redirect) location.href = redirect;
					else location.reload();
				} else if (res.message) errorMessage.value = res.message;
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
						password.value.length <= 32
					)
				}
			>
				로그인
			</button>
			<div class='flex w-full mt-2.5 mb-5 font-medium text-sm'>
				<span class='text-zinc-500'>계정이 없으신가요?&nbsp;</span>
				{useAnchor ? (
					<a
						href={`/join${
							redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''
						}`}
						class='text-brand-400 hover:underline cursor-pointer'
					>
						회원가입
					</a>
				) : (
					<button
						type='button'
						class='text-brand-400 hover:underline cursor-pointer'
						onClick={() => {
							authPage.value = 'join';
						}}
					>
						회원가입
					</button>
				)}
			</div>
		</form>
	);
}
