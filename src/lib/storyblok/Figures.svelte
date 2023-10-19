<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('text-center ', blok.class)}>
	<div class="text mb-8">
		<Heading as="h3" size="h3">{blok.title}</Heading>
	</div>
	<div class="mb-8 text-center">{@html content}</div>
	<div class="mt-16 grid grid-cols-2 flex-wrap justify-around md:flex">
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
