<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';
	import { Image } from '$lib/components';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('relative overflow-hidden', blok.class)}
>
	<Image src={blok.background.filename} alt="" />
	{#each blok.content as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
