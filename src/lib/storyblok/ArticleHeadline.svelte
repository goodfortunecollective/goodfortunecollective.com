<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="col-span-10 col-start-2 my-16">
	<Heading size="h2" as="h2">{blok.content}</Heading>
</div>
