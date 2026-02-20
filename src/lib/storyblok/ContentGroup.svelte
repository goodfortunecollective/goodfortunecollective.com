<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { getContext } from 'svelte';

	export let blok: any;

	const preview = getContext<boolean>('storyblok-preview');
</script>

{#if preview}
	<section
		use:storyblokEditable={blok}
		{...$$restProps}
		class="my-2 border border-dashed border-current/30 p-3"
	>
		{#if blok.label}
			<p class="mb-2 text-[10px] tracking-[0.12em] text-current/60 uppercase">
				{blok.label}
			</p>
		{/if}
		{#each blok.content as child}
			<StoryblokComponent blok={child} />
		{/each}
	</section>
{:else}
	{#each blok.content as child}
		<StoryblokComponent blok={child} />
	{/each}
{/if}
