<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 pt-16 pb-8 gap-8 lg:gap-0">
		<div class="col-start-2 col-span-10 lg:col-start-2 lg:col-span-3">
			<Heading as="h2" size="h3">{blok.title}</Heading>
			{#if blok.links.length}
				<div class="hidden mt-8 lg:block">
					{#each blok.links as b}
						<StoryblokComponent blok={b} />
					{/each}
				</div>
			{/if}
		</div>
		<div class="col-start-2 col-span-10 lg:col-span-5 md:col-start-6">
			<div class="flex flex-col gap-8 lg:pl-48">
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
		{#if blok.links.length}
			<div class="lg:hidden">
				{#each blok.links as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
	</div>
</div>
