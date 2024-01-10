import type { User } from 'lucia';
import { useEffect } from 'preact/hooks';

export function useEntryUserUpdater(user: User | null) {
	useEffect(() => {
		let timeout: Timer;
		if (user?.updated && Date.now() - user.updated >= 1000 * 60 * 5) {
			timeout = setTimeout(() => {
				fetch('/api/update-entry-user');
			}, 5000);
		}
		return () => clearTimeout(timeout);
	}, []);
}
