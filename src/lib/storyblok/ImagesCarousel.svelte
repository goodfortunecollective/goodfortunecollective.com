<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import { Draggable } from '$lib/vendors/gsap/Draggable.js';

	export let blok: any;

	let blockClasses = 'images-block flex py-12 overflow-hidden';
	let wrapperClasses = 'images-wrapper draggable flex md:flex-row flex-nowrap gap-4 md:gap-8';
	let imageClass = 'flex flex-col image-block';
	let imagesClasses = [];
	let imagesDraggable = null;
	let imagesWrapper!: HTMLElement;

	for (let i = 0; i < blok.images.length; i++) {
		imagesClasses[i] = imageClass;

		if (i == 0) imagesClasses[i] += ' ml-8 md:ml-24';
		else if (i == blok.images.length - 1) imagesClasses[i] += ' mr-8';
	}

	function initDraggable() {
		let minX = imagesWrapper.offsetWidth - window.innerWidth;
		imagesDraggable = Draggable.create('.images-wrapper', {
			type: 'x',
			bounds: { minX: -minX, maxX: 0 },
			inertia: true
		});
	}

	function onResize() {
		if (imagesDraggable !== null) {
			let minX = imagesWrapper.offsetWidth - window.innerWidth;
			imagesDraggable[0].applyBounds({ minX: -minX, maxX: 0 });
		}
	}

	onMount(() => {
		initDraggable();
	});
</script>

<svelte:window on:resize={onResize} />

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class={blockClasses}>
		<div class={wrapperClasses} bind:this={imagesWrapper}>
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

	.image-block-img {
		aspect-ratio: 1/1;
		object-fit: cover;
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
