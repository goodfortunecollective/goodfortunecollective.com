<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { TextTransition } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class="col-span-10 col-start-2 text-xl lg:col-span-6 lg:col-start-4"
>
	<TextTransition>{@html content}</TextTransition>
</div>
