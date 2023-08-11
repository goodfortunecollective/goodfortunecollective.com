<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 pt-24 md:pt-32 gap-8 md:gap-0">
		<Heading
			as="h2"
			size="h5"
			class="col-start-2 md:col-start-3 col-span-10  md:col-span-3 font-bold tracking-widest uppercase  w-full lg:w-1/2 title"
			>{blok.heading}</Heading
		>
		<div class="col-start-2 md:col-start-7 col-span-10 md:col-span-5 text-lg">
			<div class="flex flex-col gap-{blok.gap}">
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
