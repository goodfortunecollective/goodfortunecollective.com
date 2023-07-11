<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col items-stretch gap-12 px-8 pt-16 pb-8 lg:flex-row lg:gap-0">
			<div class="flex flex-col md:w-1/3">
				<Heading as="h2" size="h2">{blok.title}</Heading>
				{#if blok.links.length}
					<div class="hidden mt-8 lg:block">
						{#each blok.links as b}
							<StoryblokComponent blok={b} />
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex flex-1">
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
</div>
