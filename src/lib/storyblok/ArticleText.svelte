<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { RichtextTransition } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-6 lg:col-start-4"
>
	<RichtextTransition class="text-xl xl:text-2xl 4xl:text-4xl [&_p]:my-4 [&_p]:leading-snug"
		>{@html content}</RichtextTransition
	>
</div>
