<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={'heading-richtext-2col max-w-5xl mx-auto ' + blok.class}
>
	<div class="flex flex-col gap-8 px-8 pt-32 lg:flex-row lg:px-24 lg:gap-0">
		<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2 title"
			>{blok.heading}</Heading
		>
		<div class="flex-1 text-lg text text-block">
			<div class="flex flex-col gap-{blok.gap}">
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
