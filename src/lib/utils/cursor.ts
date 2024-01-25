
import { cursorType } from '$lib/stores';
import type { Options } from './types';

export function cursor(node: HTMLElement, options?: Options) {
    function handleMouseEnter() {
        cursorType('checkout');
    }

    function handleMouseLeave() {
        cursorType('none')
    }

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup when the node is destroyed
    return {
        destroy() {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}