<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import { cls } from '$lib/styles';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(blok.wrapped && 'grid grid-cols-12', blok.class)}
	style={blok.backgroundColor &&
		blok.backgroundColor !== '' &&
		`background-color: ${blok.backgroundColor};`}
>
	<div
		class={cls(
			blok.wrapped &&
				'col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-8 2xl:col-start-3'
		)}
	>
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
