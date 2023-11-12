<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

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
	<div class={cls(blok.wrapped && 'col-span-10 col-start-2')}>
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
