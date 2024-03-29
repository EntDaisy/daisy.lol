import { signal } from '@preact/signals';
import { useRef } from 'preact/hooks';
import { Join } from './join.tsx';
import { Login } from './login.tsx';

interface AuthModalProps {
	verifyId: string;
}

export const authPage = signal<'login' | 'join'>('login');
const authOpen = signal(false);
const _authOpen = signal(false);
const _redirect = signal<string | undefined>(undefined);

export const openAuthModal = (page: 'login' | 'join', redirect?: string) => {
	authPage.value = page;
	authOpen.value = true;
	_authOpen.value = true;
	_redirect.value = redirect;
};
export const closeAuthModal = () => {
	_authOpen.value = false;
	setTimeout(() => {
		authOpen.value = false;
	}, 300);
};

export function AuthModal({ verifyId }: AuthModalProps) {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<>
			<dialog
				open={authOpen.value}
				class='fixed w-full h-screen bg-transparent z-50 group'
				onClick={(e) => {
					if (e.target === ref.current) closeAuthModal();
				}}
				data-open={_authOpen.value}
			>
				<div
					ref={ref}
					class='flex items-center justify-center absolute w-full h-full
          bg-zinc-500/30 backdrop-blur-sm
          group-data-[open=true]:animate-fadeIn group-data-[open=false]:animate-fadeOut'
				>
					<div
						class='w-full bg-zinc-950 max-w-md min-h-[32px] p-0
            rounded-3xl shadow-xl
            group-data-[open=true]:animate-scaleIn group-data-[open=false]:animate-scaleOut'
					>
						{authPage.value === 'join' ? (
							<Join verifyId={verifyId} redirect={_redirect.value} />
						) : (
							<Login redirect={_redirect.value} />
						)}
					</div>
				</div>
			</dialog>
		</>
	);
}
