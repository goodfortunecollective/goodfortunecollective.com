<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="list grid grid-cols-12 gap-2">
		{#if blok.titleSide === 'left'}
			<Heading as="h2">{blok.title}</Heading>
		{/if}

		{#each blok.list as item, i}
			<div class="list-item col-span-4">
				<div class="list-item-number">
					{#if i <= 10}0{/if}{i + 1}
				</div>
				<div class="list-item-text">
					<p><StoryblokComponent blok={item} /></p>
				</div>
			</div>
			{#if blok.titleSide === 'right' && i == 0}
				<div class="col-span-4">
					<Heading as="h3">{blok.title}</Heading>
				</div>
			{/if}
		{/each}
	</div>

	<!-- <slot /> -->
</div>

<style lang="scss">
	.list-item {
		display: flex;

		&:nth-child(2) {
			margin-left: 20%;
		}
	}
</style>
