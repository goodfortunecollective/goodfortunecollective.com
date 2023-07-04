<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { Heading } from '$lib/components/typography';

	export let blok: any;
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={'heading-richtext-2col max-w-5xl mx-auto ' + blok.class}
>
	<div class="flex flex-col lg:flex-row px-8 lg:px-24 pt-32 gap-8 lg:gap-0">
		<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2 title"
			>{blok.heading}</Heading
		>
		<div class="flex-1 text-lg text text-block">
			{#each blok.content as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';
	.text {
		color: #929292;

		h4 {
			font-size: 1.5rem;
		}

		a {
			color: #303030;
		}
	}
</style>
