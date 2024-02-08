<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok}>
	<Heading
		{...$$restProps}
		as={blok.as}
		size={blok.size}
		class={blok.class}
		animated={blok.animated}>{blok.text}</Heading
	>
</div>
