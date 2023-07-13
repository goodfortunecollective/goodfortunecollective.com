import { curtains } from '../stores';
import { onMount } from 'svelte';

export function useCurtains(
	setup = (curtainsInstance: any) => {},
	cleanUp = (curtainsInstance: any) => {}
) {
	let isMounted: boolean = false;
	let curtainsInstance: any;

	const launchCallback = () => {
		if (curtainsInstance && isMounted) {
			setup(curtainsInstance);
		}
	};

	onMount(() => {
		isMounted = true;
		launchCallback();

		return () => cleanUp(curtainsInstance);
	});

	const unsubscribeCurtains = curtains.subscribe((value) => {
		if (value && !curtainsInstance) {
			curtainsInstance = value;
			launchCallback();
		}
	});

	//unsubscribeCurtains();
}
