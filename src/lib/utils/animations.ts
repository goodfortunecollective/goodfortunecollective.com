
import type { ObserverEventDetails } from 'svelte-inview';

export const inViewColorTransition = ({ detail }: CustomEvent<ObserverEventDetails>) => {
    const { inView, node } = detail as ObserverEventDetails;
    node.style.transitionProperty = inView ? 'color' : 'none';
};