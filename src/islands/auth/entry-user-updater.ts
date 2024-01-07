import { User } from 'lucia';
import { useEffect } from 'preact/hooks';

interface EntryUserUpdaterProps {
	user: User | null;
}

export function EntryUserUpdater({ user }: EntryUserUpdaterProps) {
	useEffect(() => {
		console.log('zz');
		let timeout: Timer;
		if (user?.updated && Date.now() - user.updated >= 1000 * 60 * 5) {
			timeout = setTimeout(() => {
				fetch('/api/update-entry-user');
			}, 5000);
		}
		return () => clearTimeout(timeout);
	}, []);

	return null;
}
