<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components/typography';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class="max-w-6xl mx-auto">
	<div class="flex flex-col lg:flex-row items-stretch pt-16 px-8 gap-12 lg:gap-0">
		<div class="flex flex-col justify-between space md:w-1/2">
			<Heading as="h2" size="h1">{blok.title}</Heading>
			<div class="hidden lg:block">
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
		<div class="flex-1 text-xl">
			<div class="pt-0 lg:pt-24 leading-loose">{@html content}</div>
		</div>
		<div class="lg:hidden">
			{#each blok.children as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>
