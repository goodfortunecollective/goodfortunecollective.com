<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;

	// console.log(blok);

	export let imagesLength = blok.images.length;
	export let blockClasses = 'flex my-12 images-block'; // flex-col
	export let imageClass = 'image-block';
	export let imagesCols = ['', '', ''];
	export let imagesClasses = [];

	if (imagesLength == 1) {
		blockClasses += ' w-full flex justify-center';
	} else if (imagesLength >= 3) {
		imagesCols = [
			'col-span-10 md:col-start-2 md:col-span-5',
			'col-start-3 -mt-12 col-span-10 md:col-start-7 md:col-span-5 md:mt-12',
			'col-start-2 col-span-10 md:col-start-4 md:col-span-5'
		];
		blockClasses += ' grid grid-cols-12 gap-2 ';
	}

	for (let i = 0; i < imagesCols.length; i++) {
		imagesClasses[i] = imageClass + ' ' + imagesCols[i];
	}
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class={blockClasses}>
		{#each blok.images as item, i}
			<figure class={imagesClasses[i]}>
				<img class="image-block-img" src={item.filename} />
				{#if item.title}
					<figcaption class="image-block-title">{item.title}</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.image-block {
		position: relative;

		@media (min-width: $media-md) {
			&:nth-child(2) {
				margin-left: -20%;
			}
		}
	}
</style>
