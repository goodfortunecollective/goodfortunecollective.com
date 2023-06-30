<script lang="ts">
	import { Heading } from '$lib/components/typography';
	import { StoryblokComponent, storyblokEditable, renderRichText } from '@storyblok/svelte';
	export let blok: any;
	let { body } = blok;
	// console.log(body);
	// $: name = blok.name;
</script>

<div use:storyblokEditable={body} class="px-6">
	{#each body as blok}
		<StoryblokComponent {blok} />
	{/each}
</div>

<style lang="scss">
	// @import '../../vars.scss';
</style>
