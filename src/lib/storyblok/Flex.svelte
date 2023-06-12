<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Flex } from '$lib/components/layout';

	export let blok: any;
</script>

<div use:storyblokEditable={blok}>
	<Flex
		{...$$restProps}
		as={blok.as}
		direction={blok.direction}
		justifyContent={blok.justifyContent}
		gap={blok.gap}
		class={blok.class}
	>
		{#each blok.children as b}
			<StoryblokComponent blok={b} />
		{/each}
	</Flex>
</div>
