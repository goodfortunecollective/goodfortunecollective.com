<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import { cva } from 'class-variance-authority';
	import { renderRichText } from '@storyblok/svelte';

	import { getImageDimensionsFromUrl } from '$lib/storyblok/utils';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { cls } from '$lib/styles';
	import { ScrollPlane, Heading, RichtextAnimated, Parallax } from '$lib/components';
	import { project_list_hover, isTransitioning } from '$lib/stores';
	import gsap from '$lib/gsap';
	import { cursorType } from '$lib/stores';

	export let name: string;
	export let slug: string;
	export let content: any;
	export let layout: 'left' | 'right' = 'left';
	export let theme: 'light' | 'dark' = 'light';
	export let parallaxSpeed: number = 1;

	$: description = renderRichText(content.description);

	$: isTouchDevice = browser && 'ontouchstart' in window;

	let descriptionTextRef: RichtextAnimated | null = null;

	let isActive = false;
	let ctx: any = null;
	let el!: HTMLElement;

	const variants = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: 'text-black',
				dark: 'text-white'
			},
			layout: {
				left: '',
				right: 'items-end'
			}
		},
		defaultVariants: {
			theme: 'light',
			layout: 'left'
		}
	});

	const containerStyle = cva('self-start', {
		variants: {
			margin: {
				none: '',
				left: 'lg:translate-x-[16.66%]',
				right: 'lg:-translate-x-[16.66%]'
			}
		},
		defaultVariants: {
			margin: 'none'
		}
	});

	const containerImageStyle = cva('relative h-auto w-1/2', {
		variants: {
			scale: {
				full: 'w-full',
				half: 'w-full md:w-2/3 lg:w-1/2'
			}
		},
		defaultVariants: {
			scale: 'full'
		}
	});

	const imageStyle = cva('flex overflow-hidden', {
		variants: {
			aspect: {
				square: 'aspect-square',
				landscape: 'aspect-video',
				portrait: 'aspect-[2/3]',
				auto: 'aspect-auto'
			}
		},
		defaultVariants: {
			aspect: 'landscape'
		}
	});

	function onEnter() {
		if (isTouchDevice) return;

		project_list_hover.set(name);

		descriptionTextRef?.animateIn();
		cursorType.set('checkout');
	}

	const onLeave = () => {
		if (isTouchDevice) return;

		// reset hover title only if we're not transitioning
		if (!$isTransitioning) {
			project_list_hover.set(null);
		}

		descriptionTextRef?.animateOut();
		cursorType.set('none');
	};

	const inViewItem = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		const { inView, node } = detail as ObserverEventDetails;
		node.style.transitionProperty = inView ? 'color' : 'none';

		if (!isActive && inView) {
			isActive = true;
		}
	};

	onMount(() => {
		gsap.set(el, { opacity: 0, y: 100 });

		if (isTouchDevice) {
			descriptionTextRef?.animateIn();
		}
	});

	useTransitionReady(() => {
		ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{
					opacity: 0,
					y: 100
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					ease: 'power3.out'
				}
			);
		}, el);
	});

	const getImageAspectRatio: (image: any) => 'square' | 'landscape' | 'portrait' | 'auto' = (
		image: any
	) => {
		const { width, height } = getImageDimensionsFromUrl(image);

		if (width > height) {
			return 'landscape';
		}

		if (height > width) {
			return 'portrait';
		}

		return 'square';
	};

	const getImageScaleRatio: (image: any) => 'full' | 'half' = (image: any) => {
		const { width, height } = getImageDimensionsFromUrl(image);

		if (width >= height) {
			return 'full';
		}

		return 'half';
	};

	const getContainerMargin: (image: any) => 'none' | 'left' | 'right' = (image: any) => {
		const { width, height } = getImageDimensionsFromUrl(image);

		if (width >= height) {
			return 'none';
		}

		return layout === 'left' ? 'left' : 'right';
	};

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<div class={cls('pointer-events-none mb-24 lg:mb-0', $$props.class)} bind:this={el}>
	<Parallax
		speed={parallaxSpeed}
		class={cls(
			containerStyle({
				margin: getContainerMargin(content.thumbnail.filename)
			})
		)}
		id={slug}
	>
		<a
			href="{base}/work/{slug}"
			data-id={slug}
			use:inview
			on:inview_change={inViewItem}
			on:mouseenter={onEnter}
			on:mouseleave={onLeave}
			class={cls(
				'flex-no-wrap pointer-events-auto flex w-full flex-col hover:no-underline',
				variants({ theme: theme, layout: layout })
			)}
		>
			<div
				role="group"
				class={cls(
					containerImageStyle({
						scale: getImageScaleRatio(content.thumbnail.filename)
					})
				)}
			>
				<div
					class={cls(
						imageStyle({
							aspect: getImageAspectRatio(content.thumbnail.filename)
						})
					)}
				>
					{#if isActive}
						<ScrollPlane {content} {name} />
					{/if}
				</div>
			</div>

			<div class={cls('mt-8 lg:pl-0', layout === 'right' && 'pr-8', layout === 'left' && 'pl-8')}>
				<Heading
					as="h4"
					size="h6"
					animated={false}
					class="my-0 font-bold uppercase tracking-widest"
				>
					<small>{content.brand}</small>
				</Heading>
				<Heading as="h3" size="h3" animated={false} class="mb-2 font-medium">
					{name}
				</Heading>
				<ul
					class="uppercase tracking-widest text-stone-450 lg:[&>*:not(:first-child)]:before:ml-2 lg:[&>*:not(:last-child)]:after:content-['•']"
				>
					{#each content.category as category}
						<li class="lg:inline-block">
							<small>{category.replace('-', ' ')}</small>
						</li>
					{/each}
				</ul>
				<div
					class="mt-4 max-w-md overflow-hidden text-base font-medium leading-snug lg:block xl:text-xl 4xl:text-2xl"
				>
					<RichtextAnimated bind:this={descriptionTextRef}>
						<span class="wrap" />{@html description}
					</RichtextAnimated>
				</div>
			</div>
		</a>
	</Parallax>
</div>
