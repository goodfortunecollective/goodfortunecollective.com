<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';
	import { base } from '$app/paths';
	import gsap, { ScrollTrigger } from '$lib/gsap';
	import { goto } from '$app/navigation';
	import { cls } from '$lib/styles';
	import { backgroundTheme, isTransitioningEnabled } from '$lib/stores';

	export let label: string = '';
	export let href: string = '/';
	export let disabled: boolean = false;

	let scrollEl!: HTMLElement;
	let scrollLabel!: HTMLElement;

	$: parallaxEffect = 0 as number;
	let scrollTrigger: any = null;
	let ctx: any = null;

	const variants = cva('', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	useTransitionReady(
		() => {
			ctx = gsap.context(() => {
				scrollTrigger = ScrollTrigger.create({
					trigger: scrollEl,
					start: 'top bottom',
					end: 'bottom bottom',
					invalidateOnRefresh: true,
					onUpdate: (self: any) => {
						parallaxEffect = self.progress;
					},
					onLeave: () => {
						if (disabled) return;

						ctx?.revert();
						scrollTrigger?.kill();

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
					}
				});

				return () => {
					scrollTrigger?.kill();
				};
			}, scrollEl);
		},
		() => {
			ctx?.revert();
			scrollTrigger?.kill();
		}
	);
</script>

<div
	bind:this={scrollEl}
	class={cls('c-scroll-action-to-page', variants({ theme: $backgroundTheme }))}
>
	<div style="--parallax-effect: {parallaxEffect}">
		<div
			class={cls(
				'c-scroll-action-to-page__inner',
				'flex flex-col items-center justify-center gap-8 text-center'
			)}
		>
			<p class="font-medium uppercase tracking-widest">Scroll</p>
			<div class={cls('c-scroll-action-to-page__bar', 'relative h-32 w-px')} />
			<span
				bind:this={scrollLabel}
				class={cls(
					'c-scroll-action-to-page__label',
					'inline-flex h-[1em] font-degular-display text-7xl leading-snug md:text-9xl lg:text-[12em]'
				)}>{label}</span
			>
		</div>
	</div>
</div>

<style lang="scss">
	.c-scroll-action-to-page {
		$scrollHeight: 150vh; // how much we need to scroll to go to next page
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
				background: theme('colors.yellow.350');
				transform-origin: 50% 0;
				transform: scale3d(1, var(--parallax-effect), 1);
			}
		}

		&__label {
			// prettier-ignore
			transform:
				rotate3d(1, 0, 0, calc((1 - var(--parallax-effect)) * -75deg))
				scale3d(
						calc(0.8 + 0.2 * var(--parallax-effect)),
						calc(0.8 + 0.2 * var(--parallax-effect)),
						calc(0.8 + 0.2 * var(--parallax-effect))
				);
		}
	}
</style>
