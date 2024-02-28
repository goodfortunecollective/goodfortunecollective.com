<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class="col-span-12 col-start-1 mx-4 my-8 md:col-span-10 md:col-start-2 md:mx-0"
>
	<Heading size="h2" as="h2">{blok.content}</Heading>
</div>
