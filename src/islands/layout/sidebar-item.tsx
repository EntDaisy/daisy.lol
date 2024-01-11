import type { User } from 'lucia';
import type { JSX } from 'preact/jsx-runtime';
import type { Route } from '../../routes/_app.tsx';
import { openAuthModal } from '../auth/modal.tsx';

export interface SidebarItemProps {
	route: Route;
	user: User | null;
	children: JSX.Element;
}

export function SidebarItem({
	route: { href, label, protected: _protected },
	user,
	children,
}: SidebarItemProps) {
	return (
		<a
			href={href}
			class='flex items-center h-[42px] px-3
        bg-transparent border border-transparent rounded-xl
        hover:bg-zinc-900 hover:border-zinc-800
        data-[current]:bg-brand-500/15 data-[current]:border-brand-500/15
        data-[current]:hover:bg-brand-400/15 data-[current]:hover:border-brand-400/15
        data-[not-root]:data-[ancestor]:bg-brand-500/15
        data-[not-root]:data-[ancestor]:border-brand-500/15
        data-[not-root]:data-[ancestor]:hover:bg-brand-400/15
        data-[not-root]:data-[ancestor]:hover:border-brand-400/15
        group transition-colors duration-300 ease-in-out'
			data-not-root={href !== '/' ? true : undefined}
			onClick={
				!user && _protected
					? (e) => {
							e.preventDefault();
							openAuthModal('login');
					  }
					: undefined
			}
		>
			{children}
			<span
				class='w-full ml-2
          font-[550] text-zinc-500 leading-4
          group-data-[current]:text-brand-300
          group-data-[not-root]:group-data-[ancestor]:text-brand-300
          transition-colors duration-300 ease-in-out'
			>
				{label}
			</span>
		</a>
	);
}
