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
	<Image
		src={`${blok.background.filename}/m/`}
		width={getImageDimensionsFromUrl(blok.background.filename).width}
		height={getImageDimensionsFromUrl(blok.background.filename).height}
		aspect={blok.aspect}
		alt={blok.background.name}
	/>
	{#each blok.content as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
