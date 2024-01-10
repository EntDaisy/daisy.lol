import {
	EntryIcon,
	LoginIcon,
	LogoutIcon,
	MoreIcon,
	RefreshIcon,
	SettingsIcon,
	type EvaIcon,
} from '$icons';
import { useOnDocument } from '$utils/hooks/use-on-document.ts';
import { signal } from '@preact/signals';
import type { User } from 'lucia';
import { useRef } from 'preact/hooks';
import { openAuthModal } from '../auth/modal.tsx';

interface ProfileProps {
	user: User | null;
}

interface ProfileItem {
	icon: EvaIcon;
	href: string;
	label: string;
	dangerous?: boolean;
	button?: boolean;
	newTab?: boolean;
}

const items: ProfileItem[] = [
	{
		icon: RefreshIcon,
		href: '/api/update-entry-user',
		label: '연동 새로고침',
		button: true,
	},
	{ icon: EntryIcon, href: '/mypage', label: '엔트리 프로필', newTab: true },
	{ icon: SettingsIcon, href: '/settings', label: '설정' },
	{
		icon: LogoutIcon,
		href: '/api/logout',
		label: '로그아웃',
		dangerous: true,
		button: true,
	},
];

const open = signal(false);
const _open = signal(false);

export const openModal = () => {
	open.value = true;
	_open.value = true;
};
export const closeModal = () => {
	_open.value = false;
	setTimeout(() => {
		open.value = false;
	}, 300);
};

export default function Profile({ user }: ProfileProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	useOnDocument('click', (e) => {
		if (e.target instanceof Node) {
			if (dialogRef.current?.contains(e.target)) return;
			if (toggleRef.current?.contains(e.target)) {
				if (open.value) closeModal();
				else openModal();
				return;
			}
		}
		if (open.value) closeModal();
	});

	if (!user)
		return (
			<button
				type='button'
				class='flex items-center gap-x-2 w-full px-3 py-2.5
          border border-transparent rounded-xl 
          hover:bg-zinc-900 hover:border-zinc-800 cursor-pointer
          transition-colors duration-300 ease-in-out'
				onClick={() => openAuthModal('login')}
			>
				<div class='flex items-center justify-center h-10'>
					<LoginIcon class='w-6 h-6 fill-zinc-400' />
					<span class='ml-2 font-semibold text-zinc-400 text-lg leading-4'>
						로그인
					</span>
				</div>
			</button>
		);

	return (
		<>
			<div class='relative'>
				<dialog
					ref={dialogRef}
					open={open.value}
					class='absolute left-[calc(100%_-_99px)] bottom-1 p-0 m-0
            bg-transparent border-none
            data-[open=false]:opacity-0 data-[open=false]:scale-95
            data-[open=true]:opacity-100 data-[open=true]:scale-100
            data-[open=true]:animate-fadeScaleIn data-[open=false]:animate-fadeScaleOut'
					data-open={_open.value}
				>
					<ul
						class='w-36 p-1.5
              bg-zinc-950 border border-zinc-900 rounded-xl shadow-md
              transition-colors duration-300 ease-in-out'
					>
						{items.map(
							({ icon: Icon, href, label, dangerous, button, newTab }) => {
								return (
									<li>
										{!button ? (
											<a
												href={href}
												class='flex items-center h-10 px-2.5
                          bg-transparent font-semibold border border-transparent rounded-[9px]
                          hover:bg-zinc-900 hover:border-zinc-800
                          group transition-colors duration-300 ease-in-out'
												target={newTab ? '_blank' : '_self'}
												rel={newTab ? 'noreferrer' : undefined}
												onClick={() => closeModal()}
											>
												<Icon
													class='flex-shrink-0 w-[18px] h-[18px] ml-0 fill-zinc-400
                            transition-colors duration-300 ease-in-out'
												/>
												<span
													class='bg-transparent w-full ml-2
                            text-[15px] text-zinc-400 leading-4
                            transition-colors duration-300 ease-in-out'
												>
													{label}
												</span>
											</a>
										) : (
											<button
												type='button'
												class='flex items-center w-full h-10 px-2.5
                          bg-transparent font-semibold border border-transparent rounded-[9px]
													hover:bg-zinc-900 hover:border-zinc-800
													data-[dangerous]:hover:bg-red-500/15 data-[dangerous]:hover:border-red-500/15
                          group transition-colors duration-300 ease-in-out'
												onClick={async () => {
													const res = await fetch(href).then((res) =>
														res.json(),
													);
													if (res.success) location.reload();
												}}
												data-dangerous={dangerous}
											>
												<Icon
													class='flex-shrink-0 w-[18px] h-[18px] ml-0
                            fill-zinc-400 group-data-[dangerous]:group-hover:fill-red-300
                            transition-colors duration-300 ease-in-out'
												/>
												<span
													class='bg-transparent w-full ml-2
                            text-start text-[15px] text-zinc-400 leading-4
                            group-data-[dangerous]:group-hover:text-red-300
                            transition-colors duration-300 ease-in-out'
												>
													{label}
												</span>
											</button>
										)}
									</li>
								);
							},
						)}
					</ul>
				</dialog>
			</div>
			<div
				href='/user'
				class='flex items-center w-full pr-3
          bg-zinc-900 border border-zinc-800 rounded-xl
          transition-colors duration-300 ease-in-out'
			>
				<a
					href='/user'
					class='flex items-center gap-x-2.5 w-full pl-3 py-[11px]'
				>
					<img
						src={
							user.profileImage ??
							'https://playentry.org/img/DefaultCardUserThmb.svg'
						}
						width='40'
						height='40'
						class='object-contain rounded-full'
						alt='프로필 사진'
					/>
					<div class='flex flex-col text-start overflow-hidden'>
						<span class='mt-1 font-[550] text-lg leading-4 truncate'>
							{user.nickname}
						</span>
						<span class='font-medium text-zinc-400 leading-4 truncate'>
							{user.username}
						</span>
					</div>
				</a>
				<button
					ref={toggleRef}
					type='button'
					class='p-1 ml-auto bg-transparent border border-transparent rounded-lg
            hover:bg-zinc-800 hover:border-zinc-700'
				>
					<MoreIcon class='w-5 h-5 fill-zinc-400' />
				</button>
			</div>
		</>
	);
}
