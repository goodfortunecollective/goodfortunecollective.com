
import { isTransitioning } from '$lib/stores';

import type { ObserverEventDetails } from 'svelte-inview';

export const inViewColorTransition = ({ detail }: CustomEvent<ObserverEventDetails>) => {
    const { inView, node } = detail as ObserverEventDetails;

    if(isTransitioning) {
        node.style.transitionProperty = 'none';
        return;
    }

    node.style.transitionProperty = inView && !isTransitioning ? 'color' : 'none';
};