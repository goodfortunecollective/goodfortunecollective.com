<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	export let blockClasses = 'flex py-12 images-block  overflow-hidden'; // flex-col
	export let wrapperClasses = 'flex w-[4000px] md:flex-row flex-nowrap md:gap-4'; // flex-col
	export let imageClass = 'flex flex-col image-block';
	// export let imagesCols = [];
	export let imagesClasses = [];

	for (let i = 0; i < blok.images.length; i++) {
		if (i == 0) imagesClasses[i] = imageClass + ' md:ml-24';
		else imagesClasses[i] = imageClass + ' ';
	}
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class={blockClasses}>
		<div class={wrapperClasses}>
			{#each blok.images as item, i}
				<figure class={imagesClasses[i]}>
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
		width: 50vw;

		@media (min-width: $media-md) {
			width: 30vw;
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
