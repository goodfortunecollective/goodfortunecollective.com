<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="figures-block">
		<div class="mb-8 text-center">
			<Heading as="h3" size="h3">{blok.title}</Heading>
		</div>
		<div class="mb-8 text-center block-content">{@html content}</div>
		<div class="grid grid-cols-2 gap-2 figures-block-children md:grid-cols-4">
			{#each blok.children as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>
