<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;

	// console.log(blok.content);

	// export let titleClass = 'md:col-span-4 list-item list-item-title mb-12';
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="figures-block">
		<div class="mb-8 text-center">
			<Heading as="h3" size="h3">{blok.title}</Heading>
		</div>
		<div class="mb-8 text-center block-content">{blok.content}</div>
		<!-- {blok.content.content[0].content[0]} -->
		<div class="grid grid-cols-2 gap-2 figures-block-children md:grid-cols-4">
			{#each blok.children as item, i}
				<div class="mb-12 figure-block md:mb-0">
					<div class="mb-4 font-bold md:mb-8 text-7xl md:text-9xl figure-block-title">
						{item.title}
					</div>
					<div class="figure-block-content">
						{item.content}
						<!-- <p><StoryblokComponent blok={item} /></p> -->
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	// @import '../../vars.scss';
</style>
