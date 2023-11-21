<script lang="ts">
	import { onMount } from 'svelte';

	export let progress = 0;
	export let strokeDashArray = '0px';
	export let strokeDashOffset = '0px';

	const onScroll = () => {
		progress = Math.round((100 * window.scrollY) / (documentHeight() - window.innerHeight));
		let c = Math.PI * (9 * 2);
		let pct = ((100 - progress) / 100) * c;
		strokeDashArray = c + 'px';
		strokeDashOffset = pct + 'px';
	};

	const documentHeight = () => {
		return Math.max(
			document.documentElement.clientHeight,
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight
		);
	};

	onMount(async () => {
		onScroll();
		window.addEventListener('scroll', onScroll);
	});
</script>

<div
	class="fixed bottom-[20px] right-[20px] z-40 hidden h-[20px] w-[20px] mix-blend-difference md:bottom-[60px] md:right-[60px] md:block"
	id="scroll-indicator"
>
	<div class="absolute h-full w-full rounded-full border-2 border-white opacity-20" />

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

<style>
</style>
