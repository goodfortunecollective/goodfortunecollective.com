import { cursorType } from '$lib/stores';

export function cursor(node: HTMLElement) {
	function handleMouseEnter() {
		cursorType.set('checkout');
	}

	function handleMouseLeave() {
		cursorType.set('none');
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
