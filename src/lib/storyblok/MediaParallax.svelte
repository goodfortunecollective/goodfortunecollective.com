<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { cls } from '$lib/styles';
	import { lazyLoad } from '$lib/utils/lazyLoad';

	export let blok: any;

	$: backgroundFilename = blok.background?.filename || '';
	$: backgroundDimensions = backgroundFilename
		? getImageDimensionsFromUrl(backgroundFilename)
		: { width: 0, height: 0 };
	$: backgroundWidth = backgroundDimensions.width > 0 ? backgroundDimensions.width : undefined;
	$: backgroundHeight = backgroundDimensions.height > 0 ? backgroundDimensions.height : undefined;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('relative overflow-hidden', blok.class)}
>
	{#if backgroundFilename.length > 0}
		<img
			use:lazyLoad={`${backgroundFilename}/m/`}
			width={backgroundWidth}
			height={backgroundHeight}
			alt={blok.background?.name || ''}
			loading="lazy"
			decoding="async"
			class="block h-auto w-full"
		/>
	{/if}
	{#each blok.content as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
