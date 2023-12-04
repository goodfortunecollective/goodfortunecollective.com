import { onDestroy, onMount } from 'svelte';
import { curtains } from '$lib/stores';
import type { Curtains } from '@types/curtainsjs';
import { useTransitionReady } from './useTransitionReady';

export type CurtainsInstance = null | Curtains;

export function useCurtains(
	setup: (curtainsInstance: CurtainsInstance) => void = (curtainsInstance: CurtainsInstance) => {},
	cleanUp: (curtainsInstance: CurtainsInstance) => void = (curtainsInstance: CurtainsInstance) => {}
) {
	let isMounted: boolean = false;
	let curtainsInstance: CurtainsInstance = null;

	const launchCallback = () => {
		if (curtainsInstance && isMounted) {
			setup(curtainsInstance);
		}
	};

	useTransitionReady(() => {
		isMounted = true;
		launchCallback();
	});

	onDestroy(() => {
		cleanUp(curtainsInstance);
	});

	const unsubscribeCurtains = curtains.subscribe((value) => {
		if (value && !curtainsInstance) {
			curtainsInstance = value;
			launchCallback();
		}
	});

	//unsubscribeCurtains();
}
