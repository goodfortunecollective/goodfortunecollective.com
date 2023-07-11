<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { onMount } from 'svelte';

	export let blok: any;

	onMount(() => {
		console.log(blok);
	});
</script>

<div use:storyblokEditable={blok} class={blok.class}>
	<div class="flex flex-col gap-8">
		{#each Array(4) as _, index (index)}
			<ul
				class="whitespace-nowrap overflow-hidden border-b-2 border-b-gray-200 last-of-type:border-0"
			>
				{#each blok.tags as b}
					<li class="inline-block mr-24 mb-8">
						<span class="text-7xl uppercase"><StoryblokComponent blok={b} /></span>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>
