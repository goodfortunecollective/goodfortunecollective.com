import { onMount } from 'svelte';
import { isIntroDone } from '$lib/stores';

export function useScrollTriggerReady(
	setup: () => void = () => {},
	cleanUp: () => void = () => {},
) {
	let isMounted: boolean = false;
	let isIntroComplete: boolean = false;

	const isReady = () => {
		if(isIntroComplete && isMounted) {
			setup()
		}
	}

	isIntroDone.subscribe((value) => {
		isIntroComplete = value
		isReady();
	})

	onMount(() => {
		isMounted = true;
		isReady();

		return () => cleanUp();
	});
}
