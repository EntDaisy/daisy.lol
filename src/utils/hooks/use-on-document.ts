import { useEffect } from 'preact/hooks';

export function useOnDocument<T extends keyof DocumentEventMap>(
	event: T,
	listener: (this: Document, event: DocumentEventMap[T]) => any,
) {
	useEffect(() => {
		document.addEventListener(event, listener, true);
		() => document.removeEventListener(event, listener, true);
	}, []);
}
