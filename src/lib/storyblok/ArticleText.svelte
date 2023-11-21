<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { RichtextTransition } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class="col-span-10 col-start-2 text-xl lg:col-span-6 lg:col-start-4"
>
	<RichtextTransition class="[&_p]:my-4 [&_p]:leading-8">{@html content}</RichtextTransition>
</div>
