<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;

	let titleSize = 'h3';
	if (blok.titleSize) titleSize = blok.titleSize;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 gap-8 pb-8 pt-16 lg:gap-0">
		<div
			class={'subheadline-title-cont col-span-10 col-start-2 lg:col-start-2 ' +
				(blok.titleFullWidth ? 'lg:col-span-8' : 'lg:col-span-4')}
		>
			<Heading as="h2" size={titleSize} class="leading-extra-tight">{blok.title}</Heading>
			{#if blok.links.length}
				<div class="mt-8 hidden lg:block">
					{#each blok.links as b}
						<StoryblokComponent blok={b} />
					{/each}
				</div>
			{/if}
		</div>
		<div class="col-span-10 col-start-2 md:col-start-6 lg:col-span-5 lg:col-start-6">
			<div class="flex flex-col gap-8 text-3xl leading-10">
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
	.text-beige {
		color: #dbd5bf;
	}
</style>
