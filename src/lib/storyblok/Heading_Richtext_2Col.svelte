<script lang="ts">
	import { renderRichText } from '@storyblok/svelte';

	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<Flex class="px-24 pt-32">
		<Heading as="h2" size="h5" class="uppercase font-bold tracking-widest w-1/2"
			>{blok.heading}</Heading
		>
		<div class="text-lg flex-1">{@html content}</div>
	</Flex>
</div>
