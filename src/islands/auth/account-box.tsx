import { EntryUser } from '$utils/entry-api/get-user.ts';
import { Signal } from '@preact/signals';

interface AccountBoxProps {
	user: EntryUser;
	editing: Signal<boolean>;
}

export function AccountBox({ user, editing }: AccountBoxProps) {
	return (
		<div
			class='flex items-center w-full px-3 py-2.5
        bg-zinc-900 border border-zinc-800 rounded-xl
        transition-colors duration-300 ease-in-out'
		>
			<img
				src={
					user.profileImage ??
					'https://playentry.org/img/DefaultCardUserThmb.svg'
				}
				alt={`${user.nickname}의 프로필 사진`}
				class='w-11 h-11
          border border-zinc-800 rounded-full
          transition-colors duration-300 ease-in-out'
				width='44'
				height='44'
			/>
			<div class='ml-2.5 min-w-0'>
				<div
					class='mt-0.5 font-display font-semibold leading-5
            text-start text-white text-ellipsis overflow-clip'
				>
					{user.nickname}
				</div>
				<span
					class='block font-display
            text-zinc-400 text-start text-ellipsis leading-4
            whitespace-nowrap overflow-clip'
				>
					{user.username}
				</span>
			</div>
			<button
				type='button'
				class='bg-zinc-800 ml-auto px-2.5 py-1.5
          font-medium text-sm text-zinc-300 leading-4
          border border-zinc-700 rounded-xl'
				onClick={() => {
					editing.value = true;
				}}
			>
				수정
			</button>
		</div>
	);
}
