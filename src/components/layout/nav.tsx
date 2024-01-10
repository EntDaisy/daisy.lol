import { BackButton } from '../../islands/layout/back-button.tsx';
import { NotificationButton } from '../../islands/layout/notification-button.tsx';
import type { Route } from '../../routes/_app.tsx';

interface NavProps {
	routes: Route[];
	pathname: string;
}

export default function Nav({ routes, pathname }: NavProps) {
	const selectedRoute = routes.find(
		(route) => route.href === `/${pathname.split('/')[1]}`,
	);
	const title = selectedRoute ? selectedRoute.label : null;

	return (
		<nav
			class='flex items-center sticky top-0 w-full h-16 px-3 z-40
        bg-zinc-950/80 backdrop-blur-lg border-b border-b-zinc-800
        select-none transition-colors duration-300 ease-in-out'
		>
			<BackButton />
			<h2
				class='flex-shrink-0 ml-3
          font-display font-semibold text-white text-lg
          transition-colors duration-300 ease-in-out'
			>
				{title}
			</h2>
			<div class='ml-auto' />
			<NotificationButton />
		</nav>
	);
}
