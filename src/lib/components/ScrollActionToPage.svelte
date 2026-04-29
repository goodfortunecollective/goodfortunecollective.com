<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { tick } from 'svelte';

	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';
	import { base } from '$app/paths';
	import gsap, { ScrollTrigger } from '$lib/gsap';
	import { goto } from '$app/navigation';
	import { cls } from '$lib/styles';
	import { backgroundTheme, isTransitioningEnabled } from '$lib/stores';

	export let label: string = '';
	export let href: string = '/';
	export let disabled: boolean = false;
	export let theme: 'light' | 'dark' | 'auto' = 'auto';

	let scrollEl!: HTMLElement;
	let scrollLabel!: HTMLElement;

	$: parallaxEffect = 0 as number;
	let scrollTrigger: any = null;
	let ctx: any = null;
	let isNavigating = false;
	let setupToken = 0;
	let refreshFrame: number | null = null;
	let resizeObserver: ResizeObserver | null = null;

	$: resolvedTheme = theme === 'auto' ? $backgroundTheme : theme;

	const variants = cva('', {
		variants: {
			theme: {
				light: 'text-black',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const waitForStableLayout = async () => {
		await tick();

		if ('fonts' in document) {
			await document.fonts.ready.catch(() => {});
		}

		await new Promise((resolve) => requestAnimationFrame(resolve));
		await new Promise((resolve) => requestAnimationFrame(resolve));
	};

	const scheduleRefresh = () => {
		if (refreshFrame) cancelAnimationFrame(refreshFrame);

		refreshFrame = requestAnimationFrame(() => {
			refreshFrame = null;
			scrollTrigger?.refresh();
		});
	};

	const isPastActionEnd = () => {
		const rect = scrollEl?.getBoundingClientRect();

		return !!rect && rect.bottom <= window.innerHeight + 2;
	};

	const cleanup = () => {
		setupToken += 1;

		if (refreshFrame) {
			cancelAnimationFrame(refreshFrame);
			refreshFrame = null;
		}

		resizeObserver?.disconnect();
		resizeObserver = null;

		ctx?.revert();
		scrollTrigger?.kill();
		scrollTrigger = null;
		ctx = null;
	};

	const navigateToPage = () => {
		if (disabled || isNavigating) return;

		if (!isPastActionEnd()) {
			scheduleRefresh();
			return;
		}

		isNavigating = true;

		ctx?.revert();
		scrollTrigger?.kill();
		scrollTrigger = null;
		ctx = null;

		isTransitioningEnabled.set(false);

		gsap.to(scrollEl, {
			duration: 0.5,
			y: '-100px',
			opacity: 0,
			onComplete: () => {
				goto(base + href);
			}
		});

		gsap.to(scrollLabel, {
			duration: 0.5,
			y: '-50px'
		});
	};

	useTransitionReady(async () => {
		if (scrollTrigger || isNavigating) return;

		const token = setupToken;

		await waitForStableLayout();

		if (token !== setupToken || !scrollEl || isNavigating) return;

		ctx = gsap.context(() => {
			scrollTrigger = ScrollTrigger.create({
				trigger: scrollEl,
				start: 'top bottom',
				end: 'bottom bottom',
				invalidateOnRefresh: true,
				onRefresh: (self: any) => {
					parallaxEffect = self.progress;
				},
				onUpdate: (self: any) => {
					parallaxEffect = self.progress;
				},
				onLeave: navigateToPage
			});
		}, scrollEl);

		if ('ResizeObserver' in window) {
			resizeObserver = new ResizeObserver(scheduleRefresh);
			resizeObserver.observe(document.body);
			resizeObserver.observe(scrollEl);
		}

		scheduleRefresh();
	}, cleanup);
</script>

<div
	bind:this={scrollEl}
	class={cls('c-scroll-action-to-page', variants({ theme: resolvedTheme }))}
>
	<div style="--parallax-effect: {parallaxEffect}">
		<div
			class={cls(
				'c-scroll-action-to-page__inner',
				'flex flex-col items-center justify-center gap-8 text-center'
			)}
		>
			<p class="font-medium tracking-widest uppercase">Scroll</p>
			<div class={cls('c-scroll-action-to-page__bar', 'relative h-32 w-px')}></div>
			<span
				bind:this={scrollLabel}
				class={cls(
					'c-scroll-action-to-page__label',
					'font-degular-display inline-flex h-[1em] text-7xl leading-snug md:text-9xl lg:text-[12em]'
				)}>{label}</span
			>
		</div>
	</div>
</div>

<style lang="scss">
	.c-scroll-action-to-page {
		$scrollHeight: 150vh; // how much we need to scroll to go to next page
		--label-tilt: -42deg;

		padding-bottom: $scrollHeight;

		&__inner {
			transform: translate3d(0, calc(var(--parallax-effect) * #{$scrollHeight}), 0);
			perspective: 1000px;
		}

		&__bar {
			&:before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: #fff;
				opacity: 0.3;
			}

			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: var(--color-yellow-350);
				transform-origin: 50% 0;
				transform: scale3d(1, var(--parallax-effect), 1);
			}
		}

		&__label {
			backface-visibility: hidden;
			transform-origin: 50% 50%;
			will-change: transform;

			// prettier-ignore
			transform:
				rotate3d(1, 0, 0, calc((1 - var(--parallax-effect)) * var(--label-tilt)))
				scale3d(
						calc(0.8 + 0.2 * var(--parallax-effect)),
						calc(0.8 + 0.2 * var(--parallax-effect)),
						calc(0.8 + 0.2 * var(--parallax-effect))
				);
		}

		@media (max-width: 767px) {
			--label-tilt: -75deg;
		}
	}
</style>
