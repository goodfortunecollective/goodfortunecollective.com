<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok}>
	<Heading {...$$restProps} as={blok.as} size={blok.size} class={blok.class}>{blok.text}</Heading>
</div>
