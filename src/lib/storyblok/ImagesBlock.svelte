<script lang="ts">
	import { Heading } from '$lib/components/typography';

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;
	export let isAboutBlock = false;

	if (blok.class.indexOf('about-images-block') >= 0) {
		isAboutBlock = true;
	}

	export let imagesLength = blok.images.length;
	export let blockClasses = 'flex py-12 images-block'; // flex-col
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

		if (isAboutBlock) {
			imagesCols = [
				'col-span-10 md:col-start-2 md:col-span-4',
				'col-start-3 -mt-12 col-span-10 md:col-start-7 md:col-span-4 md:mt-12',
				'col-start-2 col-span-10 md:col-start-4 md:col-span-4'
			];
		}

		blockClasses += ' grid grid-cols-12 gap-2 ';
	}

	for (let i = 0; i < imagesCols.length; i++) {
		imagesClasses[i] = imageClass + ' ' + imagesCols[i];
	}
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class={blockClasses}>
		{#each blok.images as item, i}
			<figure class={imagesClasses[i % 3]}>
				<img
					class="image-block-img"
					src={item.filename}
					alt={item.title ? item.title : 'Image ' + i}
				/>
				{#if item.title}
					<figcaption class="image-block-title">{item.title}</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.grey-bg {
		background: #bec6c4;
	}

	.image-block {
		position: relative;

		@media (min-width: $media-md) {
			&:nth-child(2) {
				margin-left: -20%;
			}
		}
	}
</style>
