<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 gap-8 pt-24 md:pt-32 md:gap-0">
		<Heading
			as="h2"
			size="h6"
			class="w-full col-span-10 col-start-2 font-bold tracking-widest uppercase md:col-start-3 md:col-span-3 xl:w-[75%] title break-keep"
			>{blok.heading}</Heading
		>
		<div class="col-span-10 col-start-2 text-lg md:col-start-7 md:col-span-5">
			<div class="flex flex-col gap-{blok.gap}">
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
