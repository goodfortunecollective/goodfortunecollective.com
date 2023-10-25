<script lang="ts">
	import { storyblokEditable, renderRichText } from '@storyblok/svelte';

	import { Heading, RichtextTransition } from '$lib/components';

	export let blok: any;

	$: left_col = renderRichText(blok.left_col);
	$: right_col = renderRichText(blok.right_col);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="process-text grid grid-cols-12 pb-36 pt-32">
		<div class="col-span-10 col-start-2 mb-12 md:col-span-4 md:col-start-2 md:mb-0">
			<Heading as="h4" size="h6" class="mb-4 uppercase">{blok.left_col_title}</Heading>
			<RichtextTransition>{@html left_col}</RichtextTransition>
		</div>
		<div class="col-span-10 col-start-2 md:col-span-4 md:col-start-7">
			<Heading as="h4" size="h6" class="mb-4 uppercase">{blok.right_col_title}</Heading>
			<RichtextTransition>{@html right_col}</RichtextTransition>
		</div>
	</div>
</div>
