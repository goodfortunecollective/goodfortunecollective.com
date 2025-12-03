<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cls } from '$lib/styles';
	import gsap from '$lib/gsap';
	import { lenisStore as lenis } from '$lib/stores/lenis';
	import { onDestroy } from 'svelte';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let strokeDashArray = '0px';
	export let strokeDashOffset = '0px';

	let buttonBackToTopVisible: boolean = false;

	const onScroll = (scroll: any) => {
		let c = Math.PI * (9 * 2);
		let pct = (1 - scroll.progress) * c;

		strokeDashArray = c + 'px';
		strokeDashOffset = pct + 'px';

		buttonBackToTopVisible = scroll.progress > 0.75;
	};

	useTransitionReady(() => {
		$lenis?.on('scroll', onScroll);
	});

	onDestroy(() => {
		$lenis?.off('scroll', onScroll);
	});
</script>

<div
	class="fixed right-[20px] bottom-[20px] z-40 hidden gap-8 mix-blend-difference md:right-[60px] md:bottom-[60px] md:flex"
	id="scroll-indicator"
>
	<div class="flex flex-col gap-8">
		<div class="z-1 h-[66px] w-[20px]">
			{#if buttonBackToTopVisible}
				<div class="relative h-full w-full">
					<button
						on:click={() => gsap.to(window, { duration: 2, scrollTo: 0 })}
						transition:fly={{ y: 40, duration: 200 }}
						title="Go to top"
						class={cls('back-to-top-btn', 'h-full w-full')}
					>
						<div class="arrow"></div>
					</button>
				</div>
			{/if}
		</div>

		<div class="relative">
			<div class="absolute h-full w-full rounded-full border-2 border-white opacity-20"></div>

			<svg width="20" height="20" style="transform:rotate(-90deg)">
				<circle
					r="9"
					cx="10"
					cy="10"
					stroke="white"
					stroke-width="2"
					stroke-linecap="butt"
					stroke-dashoffset={strokeDashOffset}
					fill="transparent"
					stroke-dasharray={strokeDashArray}
				/>
			</svg>
		</div>
	</div>
</div>

<style lang="scss">
	.back-to-top-btn {
		opacity: 0.4;
		transition: 0.5s opacity;

		&:hover {
			opacity: 1;
		}

		&:before {
			position: absolute;
			top: 0;
			left: 50%;
			width: 1px;
			bottom: 0;
			content: '';
			background: var(--color-yellow-350);
		}

		&:after {
			position: absolute;
			width: 1px;
			left: 2px;
			height: 100%;
			// background: white;
			content: '';
		}

		.arrow {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, 0) rotate(-90deg);

			&:before,
			&:after {
				width: 4px;
				height: 1px;
				position: absolute;
				top: 0;
				right: 0;
				background: var(--color-yellow-350);
				content: '';
			}

			&:before {
				transform: rotate(40deg);
				transform-origin: top right;
			}

			&:after {
				transform: rotate(-40deg);
				transform-origin: bottom right;
			}
		}
	}
</style>
