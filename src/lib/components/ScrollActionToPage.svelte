<script lang="ts">
	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';
	import { ScrollTrigger } from '$lib/gsap';
	import { base } from '$app/paths';
	import gsap from '$lib/gsap';
	import { goto } from '$app/navigation';

	export let label: string = '';
	export let href: string = '/';

	let scrollEl!: HTMLElement;

	$: parallaxEffect = 0 as number;
	let scrollTrigger = null;
	let gsapCtx = null;

	useTransitionReady(
		() => {
			gsapCtx = gsap.context(() => {
				scrollTrigger = ScrollTrigger.create({
					trigger: scrollEl,
					start: 'top bottom',
					end: 'bottom bottom',
					onUpdate: (self) => {
						parallaxEffect = self.progress;
					},
					onLeave: () => {
						requestAnimationFrame(() => goto(base + href));
					}
				});

				return () => {
					scrollTrigger?.kill();
				};
			});
		},
		() => {
			gsapCtx?.revert();
		}
	);
</script>

<div bind:this={scrollEl} class="ScrollActionToPage">
	<div style="--parallax-effect: {parallaxEffect}">
		<div
			class="ScrollActionToPage-inner flex flex-col justify-center items-center text-center gap-8"
		>
			<p class="uppercase font-medium tracking-widest">Scroll</p>
			<div class="ScrollActionToPage-bar relative h-32 w-px" />
			<span
				class="ScrollActionToPage-label inline-flex h-[1em] font-degular-display leading-8 text-[10em]"
				>{label}</span
			>
		</div>
	</div>
</div>

<style lang="scss">
	.ScrollActionToPage {
		$scrollHeight: 150vh; // how much we need to scroll to go to next page
		padding-bottom: $scrollHeight;

		&-inner {
			transform: translate3d(0, calc(var(--parallax-effect) * #{$scrollHeight}), 0);
			perspective: 1000px;
		}

		&-bar {
			&:before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: #cccccc;
			}

			&:after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: black;
				transform-origin: 50% 0;
				transform: scale3d(1, var(--parallax-effect), 1);
			}
		}

		&-label {
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
