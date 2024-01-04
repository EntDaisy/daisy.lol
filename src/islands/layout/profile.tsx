import {
	LogoutIcon,
	MoreIcon,
	PersonIcon,
	SettingsIcon,
	type EvaIcon,
} from '$icons';
import { useSignal } from '@preact/signals';
import { useRef } from 'preact/hooks';
import { useOnDocument } from '../../lib/use-on-document.ts';

const user = {
	username: 'dukhwa',
	nickname: '띠까',
	entryId: '60bc5559659bf40bd15d022c',
};

interface ProfileItem {
	icon: EvaIcon;
	href: string;
	label: string;
	dangerous?: boolean;
}

const items: ProfileItem[] = [
	{ icon: PersonIcon, href: '/user', label: '내 프로필' },
	{ icon: SettingsIcon, href: '/settings', label: '설정' },
	{ icon: LogoutIcon, href: '/logout', label: '로그아웃', dangerous: true },
];

export default function Profile() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const open = useSignal(false);

	useOnDocument('click', (e) => {
		if (e.target instanceof Node) {
			if (dialogRef.current?.contains(e.target)) return;
			if (toggleRef.current?.contains(e.target)) {
				open.value = !open.value;
				return;
			}
		}
		if (open.value) open.value = false;
	});

	return (
		<>
			<div class='relative'>
				<dialog
					ref={dialogRef}
					open={open.value}
					class='block absolute left-full bottom-1 p-0 m-0
            bg-transparent opacity-0 scale-95 translate-x-[calc(-50%_-_27px)] border-none
            open:opacity-100 open:scale-100
            transition-[opacity_transform] duration-300 ease-in-out'
				>
					<ul
						class='w-36 p-1.5
              bg-zinc-950 border border-zinc-900 rounded-xl shadow-md
              transition-colors duration-300 ease-in-out'
					>
						{items.map(({ icon: Icon, href, label, dangerous }) => {
							return (
								<li>
									<a
										href={href}
										class='flex items-center h-10 px-2.5
                      bg-transparent font-semibold border border-transparent rounded-[9px]
                      hover:bg-zinc-900 hover:border-zinc-800
                      data-[dangerous]:hover:bg-red-500/15 data-[dangerous]:hover:border-red-500/15
                      group transition-colors duration-300 ease-in-out'
										data-dangerous={dangerous}
									>
										<Icon
											class='flex-shrink-0 w-[18px] h-[18px] ml-0
                        fill-zinc-400 group-data-[dangerous]:group-hover:fill-red-300
                        transition-colors duration-300 ease-in-out'
										/>
										<span
											class='bg-transparent w-full ml-2
                        text-[15px] text-zinc-400 leading-4 group-data-[dangerous]:group-hover:text-red-300
                        transition-colors duration-300 ease-in-out'
										>
											{label}
										</span>
									</a>
								</li>
							);
						})}
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
						src='https://playentry.org/img/DefaultCardUserThmb.svg'
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
