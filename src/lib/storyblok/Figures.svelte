<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('text-center ', blok.class)}>
	<div class="mb-8 text">
		<Heading as="h3" size="h3">{blok.title}</Heading>
	</div>
	<div class="mb-8 text-center">{@html content}</div>
	<div class="grid grid-cols-2 md:flex justify-around flex-wrap mt-16">
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
