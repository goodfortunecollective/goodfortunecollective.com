<script lang="ts">
	import { base } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { gsap } from '$lib/gsap';

	import gfc from '$lib/images/gfc.svg';

	const navigation = [
		{ name: 'Work', path: 'work' },
		{ name: 'About', path: 'about' },
		{ name: 'Careers', path: 'careers' },
		{ name: 'Contact', path: 'contact' }
	];

	let mobileMenuOpen = false;
	const openMobileMenu = () => (mobileMenuOpen = true);
	const closeMobileMenu = () => (mobileMenuOpen = false);

	let previousY: number;
	let currentY: number;
	let clientHeight: number;

	const deriveDirection = (y: number) => {
		const direction = !previousY || previousY < y ? 'down' : 'up';
		previousY = y;

		return direction;
	};

	$: scrollDirection = deriveDirection(currentY);
	$: offscreen = scrollDirection === 'down' && currentY > clientHeight * 4;

	onMount(() => {
		const tl = gsap.timeline();

		tl.fromTo(
			'.a-logo',
			{
				opacity: 0
			},
			{
				opacity: 1,
				duration: 3,
				ease: 'power4.out'
			}
		);

		tl.fromTo(
			'.a-nav-items',
			{
				y: -20,
				opacity: 0
			},
			{
				opacity: 1,
				y: 0,
				duration: 1.8,
				stagger: 0.1,
				delay: 0.6,
				ease: 'power4.out'
			},
			'<'
		);
	});
</script>

<svelte:window bind:scrollY={currentY} />

<header
	class="sticky top-0 z-10 h-[var(--header-height)] transition-transform"
	class:motion-safe:-translate-y-full={offscreen}
	bind:clientHeight
>
	<nav
		class="mx-auto flex max-w-7xl items-center justify-between p-6 sm:px-8 mix-blend-difference"
		aria-label="Global"
	>
		<a href="/" class="-m-1.5 p-1.5 a-logo">
			<span class="sr-only">Good Fortune Collective</span>
			<img class="h-8 w-auto" src={gfc} alt="" />
		</a>
		<div class="flex sm:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
				on:click={openMobileMenu}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<div class="hidden sm:flex sm:gap-x-12">
			{#each navigation as { name, path }, i}
				<a href="{base}/{path}" class="text-sm font-semibold leading-6 text-gray-white">
					<span class="a-nav-items block">{name}</span>
				</a>
			{/each}
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if mobileMenuOpen}
		<div class="sm:hidden" role="dialog" aria-modal="true" in:fade={{}} out:fade={{ delay: 400 }}>
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-10" />
			<div
				class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 p-1.5" on:click={closeMobileMenu}>
						<span class="sr-only">Good Fortune Collective</span>
						<img class="h-8 w-auto" src={gfc} alt="" />
					</a>
					<button
						type="button"
						class="-m-2.5 rounded-md p-2.5 text-gray-700"
						on:click={closeMobileMenu}
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							{#each navigation as { name, path }, i}<a
									href="{base}/{path}"
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									in:fly={{ x: -48, duration: 500, delay: 300 + 50 * i }}
									out:fly={{ x: -48, duration: 500, delay: 50 * i }}
									on:click={closeMobileMenu}>{name}</a
								>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
</style>
