import { useEffect } from 'preact/hooks';

export function useOnDocument<T extends keyof DocumentEventMap>(
	event: T,
	// deno-lint-ignore no-explicit-any
	listener: (this: Document, event: DocumentEventMap[T]) => any,
) {
	useEffect(() => {
		document.addEventListener(event, listener, true);
		() => document.removeEventListener(event, listener, true);
	}, []);
}
