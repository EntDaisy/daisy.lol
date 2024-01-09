import type { User } from 'lucia';
import { AuthModal } from '../../islands/auth/modal.tsx';
import Profile from '../../islands/layout/profile.tsx';
import type { Route } from '../../routes/_app.tsx';
import { Logo } from '../common/logo.tsx';
import { SearchBar } from './search-bar.tsx';

interface SidebarProps {
	user: User | null;
	routes: Route[];
}

export function Sidebar({ user, routes }: SidebarProps) {
	return (
		<section class='flex flex-col sticky top-0 h-screen px-3 border-r border-r-zinc-900 select-none'>
			<a href='/' class='flex flex-col gap-y-2'>
				<div class='flex items-center gap-x-2 px-2 mt-12'>
					<Logo class='w-[34px] h-[34px]' />
					<h1 class='font-display font-semibold text-[28px]'>Daisy</h1>
				</div>
				<SearchBar />
			</a>
			<div class='flex flex-col gap-y-0.5 mt-3'>
				{routes.map(({ icon: Icon, href, label }) => {
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
						>
							<Icon
								class='flex-shrink-0 w-[18px] h-[18px]
                  fill-zinc-500
                  group-data-[current]:fill-brand-300
                  group-data-[not-root]:group-data-[ancestor]:fill-brand-300
                  transition-colors duration-300 ease-in-out'
							/>
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
				})}
			</div>
			<div class='mt-auto mb-3'>
				<Profile user={user} />
			</div>
			<AuthModal verifyId={Deno.env.get('VERIFY_ID') ?? ''} />
		</section>
	);
}
