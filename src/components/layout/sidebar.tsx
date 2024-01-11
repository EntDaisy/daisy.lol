import type { User } from 'lucia';
import Profile from '../../islands/layout/profile.tsx';
import { SidebarItem } from '../../islands/layout/sidebar-item.tsx';
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
					<h1 class='font-display font-semibold text-[26px]'>Daisy</h1>
				</div>
				<SearchBar />
			</a>
			<div class='flex flex-col gap-y-0.5 mt-3'>
				{routes.map((route) => {
					return (
						<SidebarItem route={route} user={user}>
							<route.icon
								class='flex-shrink-0 w-[18px] h-[18px]
                  fill-zinc-500
                  group-data-[current]:fill-brand-300
                  group-data-[not-root]:group-data-[ancestor]:fill-brand-300
                  transition-colors duration-300 ease-in-out'
							/>
						</SidebarItem>
					);
				})}
			</div>
			<div class='mt-auto mb-3'>
				<Profile user={user} />
			</div>
		</section>
	);
}
