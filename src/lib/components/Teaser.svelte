<script lang="ts">
	import { storyblokEditable, renderRichText } from '@storyblok/svelte';

	export let blok: any;

	$: headlineHTML = renderRichText(blok.headline);
</script>

<div use:storyblokEditable={blok} class="py-8 mb-6 text-5xl font-bold text-center">
	{@html headlineHTML}
</div>
