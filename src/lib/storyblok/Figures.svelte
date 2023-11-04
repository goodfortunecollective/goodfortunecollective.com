<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import RichtextTransition from '$lib/components/RichtextTransition.svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('mt-32 grid grid-cols-12 text-center', blok.class)}
>
	<div class="mb-8m col-span-10 col-start-2 lg:col-span-6 lg:col-start-4">
		<Heading as="h3" size="h2" cl>{blok.title}</Heading>
	</div>
	<div class="col-span-10 col-start-2 my-8 text-center text-xl lg:col-span-6 lg:col-start-4">
		<RichtextTransition class="[&_p]:my-4 [&_p]:leading-8">{@html content}</RichtextTransition>
	</div>
	<div
		class="col-span-10 col-start-2 mt-16 flex flex-col flex-wrap justify-center gap-16 lg:flex-row lg:gap-32"
	>
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</div>
</div>
