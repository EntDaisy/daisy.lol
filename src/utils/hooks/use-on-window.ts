import { useEffect } from 'preact/hooks';

export function useOnWindow<T extends keyof WindowEventMap>(
	event: T,
	listener: (this: Window, event: WindowEventMap[T]) => any,
) {
	useEffect(() => {
		addEventListener(event, listener, true);
		() => removeEventListener(event, listener, true);
	}, []);
}
