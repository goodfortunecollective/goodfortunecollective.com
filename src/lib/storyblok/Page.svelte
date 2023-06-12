<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
	let { body } = blok;
</script>

<div use:storyblokEditable={body} class="px-6">
	{#each body as blok}
		<StoryblokComponent {blok} />
	{/each}
</div>
