<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;

	let titleSize = 'h3';
	if (blok.titleSize) titleSize = blok.titleSize;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 gap-8 pt-16 pb-8 lg:gap-0">
		<div
			class={'subheadline-title-cont col-span-10 col-start-2 lg:col-start-2 ' +
				(blok.titleFullWidth ? 'lg:col-span-8' : 'lg:col-span-4')}
		>
			<Heading as="h2" size={titleSize} class="leading-extra-tight">{blok.title}</Heading>
			{#if blok.links.length}
				<div class="hidden mt-8 lg:block">
					{#each blok.links as b}
						<StoryblokComponent blok={b} />
					{/each}
				</div>
			{/if}
		</div>
		<div class="col-span-10 col-start-2 lg:col-span-5 md:col-start-6 lg:col-start-6">
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

<style lang="scss">
	@import '../../vars.scss';

	.subheadline-title-cont :global(.size-h1) {
		line-height: 0.85;
	}

	.text-beige {
		color: #dbd5bf;
	}
</style>
