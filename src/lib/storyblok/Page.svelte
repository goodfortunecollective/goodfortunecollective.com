<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	let { body, seo } = blok;
</script>

{#if seo?.length > 0}
	<StoryblokComponent blok={seo[0]} />
{/if}

<div use:storyblokEditable={body}>
	{#each body as blok}
		<StoryblokComponent {blok} />
	{/each}
</div>
