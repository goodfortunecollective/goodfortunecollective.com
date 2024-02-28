<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';
	import { Image } from '$lib/components';
	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('relative overflow-hidden', blok.class)}
>
	{#if blok.background?.filename?.length > 0}
		<Image
			src={`${blok.background.filename}/m/`}
			width={getImageDimensionsFromUrl(blok.background.filename).width}
			height={getImageDimensionsFromUrl(blok.background.filename).height}
			aspect="auto"
			alt={blok.background.name}
		/>
	{/if}
	{#each blok.content as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
