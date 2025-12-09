<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading, Spacer } from '$lib/components';
	import gsap from '$lib/gsap';
	import { backgroundTheme } from '$lib/stores';
	import { cls } from '$lib/styles';
	import { debounce } from '$lib/utils/debounce';
	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';
	import { onMount } from 'svelte';

	export let blok: any;

	$: innerWidth = 0;
	let lastWidth = 0;

	let el!: HTMLElement;
	let scrollEl!: HTMLElement;
	let ctx: any = null;

	const variants = cva('', {
		variants: {
			size: {
				small: 'h-48 md:h-64 2xl:h-72 4xl:h-80' /* 256px */,
				medium: 'h-72 md:h-96 2xl:h-112 4xl:h-128' /* 384px */,
				large: 'h-96 md:h-128 2xl:h-160 4xl:h-224' /* 512px */,
				'extra-large': 'h-128 md:h-160 2xl:h-224 4xl:h-256'
			},
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			size: 'medium',
			theme: 'light'
		}
	});

	onMount(() => {
		lastWidth = innerWidth;
	});

	const setupAnimation = () => {
		ctx = gsap.context(() => {
			if (!scrollEl || !scrollEl.scrollWidth) return;

			gsap.to(scrollEl, {
				x: () => {
					return scrollEl?.scrollWidth ? scrollEl.scrollWidth * -1 : 0;
				},
				xPercent: 100,
				ease: 'none',
				scrollTrigger: {
					trigger: scrollEl,
					start: blok.title?.length > 0 ? 'center 58%' : 'center center',
					end: () => {
						if (scrollEl?.scrollWidth && innerWidth) {
							return `+=${scrollEl.scrollWidth - innerWidth}`;
						}
						return 0;
					},
					pin: el,
					scrub: true,
					invalidateOnRefresh: true
				}
			});
		}, scrollEl);
	};

	useTransitionReady(
		() => {
			setupAnimation();
		},
		() => {
			ctx?.revert();
		}
	);

	const onResize = () => {
		if (lastWidth === innerWidth) return;

		ctx?.revert();
		setupAnimation();

		lastWidth = innerWidth;
	};
</script>

<svelte:window bind:innerWidth on:resize={debounce(onResize)} />

<div
	bind:this={el}
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(
		'relative flex w-full',
		variants({ theme: $backgroundTheme, size: blok.size }),
		blok.class
	)}
>
	<div>
		{#if blok.title?.length > 0}
			<div class="fixed grid w-full grid-cols-12">
				<div
					class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 2xl:col-span-8 2xl:col-start-3"
				>
					<Heading as="h2" animated={true} size="h2" leading="tightest">
						{blok.title}
					</Heading>
				</div>
			</div>
			<Spacer gap="extra-large" />
		{/if}
		<div class={cls('overflow mr-4 md:mr-8', blok.title?.length > 0 && 'pt-4')}>
			<div class="grid grid-cols-12" bind:this={scrollEl}>
				<div
					class="col-span-12 col-start-1 mx-4 flex gap-4 md:col-span-10 md:col-start-2 md:mx-0 md:gap-8 2xl:col-span-8 2xl:col-start-3"
				>
					{#each blok.content as b, index}
						<div class={variants({ size: blok.size })}>
							<StoryblokComponent blok={b} {index} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
