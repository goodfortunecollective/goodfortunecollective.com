<script lang="ts">
	import { onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';
	import { Draggable } from '$lib/vendors/gsap/Draggable.js';
	import CustomCursor from '../components/CustomCursor.svelte';

	export let blok: any;

	let imagesLength = blok.images.length;
	let blockClasses = 'headline-images pt-24 pb-12 overflow-hidden';
	let wrapperClasses =
		'images-wrapper draggable flex items-start flex-row flex-wrap gap-8 md:gap-16 gap-y-4 md:gap-y-8';
	let imageClass = 'flex flex-col image-block w-[33vw]';
	let imagesCols = ['', '', ''];
	let imagesClasses = ['', '', ''];
	let imagesDraggable = null;
	let imagesDraggableRatio: number = 0;
	let imagesWrapper!: HTMLElement;

	imagesCols = [
		// 1st line
		'flex-col-reverse ml-12 md:ml-24',
		'flex-col-reverse mt-16 md:mt-32 ',
		'flex-col-reverse -mt-12 md:-mt-24',
		'flex-col-reverse',
		// 2nd line
		'ml-8 -mt-24 md:-mt-36',
		'w-[22vw] mt-12 md:mt-24',
		'',
		'-mt-16 md:-mt-32'
	];

	const imagesParallax = [
		// 1st line
		'0.25',
		'0.5',
		'0.33',
		'0.05',
		// 2nd line
		'0.3',
		'0.4',
		'0.2',
		'0.15'
	];

	for (let i = 0; i < imagesCols.length; i++) {
		imagesClasses[i] = imageClass + ' image-block-' + i + ' ' + imagesCols[i];
	}

	$: getParallax = (index) => {
		return imagesParallax[index] * imagesDraggableRatio;
	};

	$: showCursor = false as boolean;

	const onMouseEnter = () => {
		showCursor = true;
	};

	const onMouseLeave = () => {
		showCursor = false;
	};

	onMount(() => {
		imagesDraggable = Draggable.create('.images-wrapper', {
			type: 'x',
			bounds: '.headline-images',
			inertia: true,
			onDrag: function () {
				imagesDraggableRatio = 1 - (this.x - this.minX) / (this.maxX - this.minX);
			},
			onThrowUpdate: function () {
				imagesDraggableRatio = 1 - (this.x - this.minX) / (this.maxX - this.minX);
			}
		});
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class={blockClasses}>
		<CustomCursor cursorType="horizontal-drag" isHidden={!showCursor} />
		<div on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
			<div class={wrapperClasses} bind:this={imagesWrapper}>
				{#each blok.images as item, i}
					<figure class={imagesClasses[i]} style="--parallax: {getParallax(i)}">
						<img
							class="image-block-img"
							src={item.filename}
							alt={item.name ? item.name : 'Image ' + i}
						/>
						{#if item.name && blok.show_title}
							<figcaption
								class="my-4 text-sm font-bold tracking-widest uppercase image-block-caption"
							>
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
</div>

<style lang="scss">
	@import '../../vars.scss';

	.images-wrapper {
		width: 160vw;

		figure {
			transform: translate3d(calc(100% * var(--parallax)), 0, 0);
		}
	}

	.image-block {
		position: relative;
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
			background: $black;
			content: '';
		}
	}
</style>
