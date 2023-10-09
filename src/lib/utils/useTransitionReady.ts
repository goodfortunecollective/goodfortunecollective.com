import { onMount } from 'svelte';

import { isIntroDone, isTransitionDone } from '$lib/stores';

export function useTransitionReady(
	setup: () => void = () => {},
	cleanUp: () => void = () => {},
) {
	let isMounted: boolean = false;
	let isIntroComplete: boolean = false;
	let isTransitionComplete: boolean = false;

	const isReady = () => {
		if(isIntroComplete && isTransitionComplete && isMounted) {
			setup()
		}
	}

	const destroy = () => {
		isMounted = false;
		cleanUp();
	}

	isTransitionDone.subscribe((value) => {
		isTransitionComplete = value
		isReady();
	})

	isIntroDone.subscribe((value) => {
		isIntroComplete = value
		isReady();
	})

	onMount(() => {
		isMounted = true;
		isReady();

		return () => destroy();
	});

}
