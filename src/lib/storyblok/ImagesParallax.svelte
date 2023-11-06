<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cls } from '$lib/styles';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('relative', blok.class)}>
	<img src={blok.background.filename} alt="" class="" />
	{#each blok.content as b}
		<StoryblokComponent blok={b} />
	{/each}
</div>
