<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={'heading-richtext-2col max-w-5xl mx-auto ' + blok.class}
>
	<Flex class="px-24 pt-32">
		<Heading as="h2" size="h5" class="font-bold tracking-widest uppercase md:w-1/2 title"
			>{blok.heading}</Heading
		>
		<div class="flex-1 text-lg text text-block">
			{@html content}
		</div>
	</Flex>
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
