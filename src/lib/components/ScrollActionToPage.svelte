<script lang="ts">
	import {onMount} from 'svelte';
	import {ScrollTrigger} from '$lib/gsap';
	import {base} from '$app/paths';
	import {goto} from '$app/navigation';

	export let label: string = '';
	export let href: string = '/';

	let scrollEl!: HTMLElement;
	let scrollProgressEl!: HTMLElement;

	$: parallaxEffect = 0 as number;
	let scrollTrigger = null;

	onMount(() => {
		scrollTrigger = ScrollTrigger.create({
			trigger: scrollEl,
			//scrub: true,
			start: "top bottom",
			end: "+=150%",
			//markers: true,
			onUpdate: (self) => {
				parallaxEffect = self.progress
			},
			onLeave: () => {
				console.log('complete, GO TO', base + href)
				//goto(base + href);
				//parallaxEffect = 0
			}
		});

		return () => {
			scrollTrigger.kill()
		}
	})
</script>

<div className="ScrollActionToPage pb-[100vh]">
	<div bind:this={scrollEl} style="--parallax-effect: {parallaxEffect}">
		<div className="ScrollActionToPage-inner flex flex-col justify-center items-center text-center gap-8">
			<p className="uppercase font-medium tracking-widest">Scroll</p>
			<div className="ScrollActionToPage-bar relative h-32 w-px"/>
			<span
				className="ScrollActionToPage-label inline-flex h-[1em] font-degular-display leading-8 text-[10em]">{label}</span>
		</div>

	</div>


</div>

<style lang="scss">
	.ScrollActionToPage {
		margin - bottom: -5vh;

		&-inner {
			transform: translate3d(0, calc(var(--parallax-effect) * 100vh), 0);
			perspective: 1000px;
		}

		&-bar {
			&:before {
				content: "";
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: #cccccc;
			}

			&:after {
				content: "";
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: black;
				transform-origin: 50% 0;
				transform: scale3d(1, var(--parallax-effect), 0);
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
