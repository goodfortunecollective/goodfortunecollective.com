<script lang="ts">
	import { cursorType } from '$lib/stores';

	export let blok: any;

	function onEnter() {
		cursorType.set('checkout');
	}

	const onLeave = () => {
		cursorType.set('none');
	};
</script>

<a
	on:mouseenter={onEnter}
	on:mouseleave={onLeave}
	target="_blank"
	rel="noopener"
	class="hover:no-underline"
	href={blok.url}
	title={blok.label}
>
	<span class={blok.class}>{blok.name}</span>
</a>
