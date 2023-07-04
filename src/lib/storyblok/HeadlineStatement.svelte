<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components/typography';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="max-w-6xl mx-auto">
	<div class="flex flex-col items-stretch gap-12 px-8 pt-16 pb-8 lg:flex-row lg:gap-0">
		<div class="flex flex-col justify-between space md:w-1/2">
			<Heading as="h2" size="h1">{blok.title}</Heading>
			<div class="hidden mt-8 lg:block">
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
		<div class="flex items-end flex-1 text-xl">
			<div class="pt-0 leading-6 text lg:pt-24">{@html content}</div>
		</div>
		<div class="mt-4 lg:hidden">
			{#each blok.children as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.text {
		color: #2c3436;
	}
</style>
