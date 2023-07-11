<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	export let imagesLength = blok.images.length;
	export let blockClasses = 'flex py-12 images-block'; // flex-col
	export let imageClass = 'image-block';
	export let imagesCols = ['', '', ''];
	export let imagesClasses = ['', '', ''];

	if (imagesLength == 1) {
		blockClasses += ' w-full justify-center';
	} else if (imagesLength >= 3) {
		blockClasses += ' max-w-6xl mx-auto md:flex-row md:gap-4';
		imageClass = 'basis-full';
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
					alt={item.name ? item.name : 'Image ' + i}
				/>
				{#if item.name && blok.show_title}
					<figcaption class="mt-4 font-bold tracking-widest uppercase image-block-caption">
						<span class="caption-number"
							>{#if i <= 10}0{/if}{i + 1}</span
						>
						<span class="opacity-50 caption-text">{item.name}</span>
					</figcaption>
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

	.black-bg {
		background: #1c1c1c;
		color: $white;
	}

	.image-block {
		position: relative;

		@media (min-width: $media-md) {
			&:nth-child(2) {
				margin-left: -20%;
			}
		}
	}

	.caption-number {
		position: relative;
		margin-right: 70px;

		&:after {
			position: absolute;
			top: 9px;
			right: -60px;
			width: 50px;
			height: 1px;
			background: $white;
			content: '';
		}
	}
</style>
