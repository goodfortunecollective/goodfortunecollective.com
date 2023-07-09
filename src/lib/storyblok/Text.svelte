<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<span use:storyblokEditable={blok} {...$$restProps} class={blok.class}>{@html content}</span>
