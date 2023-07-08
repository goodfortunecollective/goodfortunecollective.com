<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;

	// console.log(blok);

	// export let textClass = 'md:col-span-6 list-item list-item-text mb-12 md:mb-24';
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="max-w-6xl mx-auto">
		<div class="px-6">
			<div class="flex flex-row justify-between py-8 md:py-16 list md:gap-4">
				{#each blok.children as item, i}
					<div class="flex text-block">
						<p><StoryblokComponent blok={item} /></p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.centered {
		text-align: center;
	}

	.black-bg {
		background: #1c1c1c;
		color: $white;
	}
</style>
