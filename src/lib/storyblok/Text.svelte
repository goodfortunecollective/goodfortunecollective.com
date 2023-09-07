<script lang="ts">
	import TextTransition from '$lib/components/TextTransition.svelte';
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<span use:storyblokEditable={blok} {...$$restProps} class={blok.class}
	><TextTransition>{@html content}</TextTransition></span
>
