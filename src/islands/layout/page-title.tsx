import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

export function PageTitle() {
	const title = useSignal<string | null>(null);

	useEffect(() => {
		const titleEl = document.querySelector('title')!;
		if (titleEl.textContent)
			title.value = titleEl.textContent.trim().slice(0, -8);

		const observer = new MutationObserver((mutations) => {
			if (mutations[0].target.textContent)
				title.value = mutations[0].target.textContent?.trim().slice(0, -8);
		});

		observer.observe(titleEl, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		() => observer.disconnect();
	}, []);

	return <>{title}</>;
}
