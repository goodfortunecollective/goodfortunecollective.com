<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import gsap from '$lib/gsap';
	import { Gfc } from '$lib/components';

	export let blok: any;

	const navigation = [
		{ name: 'Work', path: 'work' },
		{ name: 'About', path: 'about' },
		{ name: 'Culture', path: 'culture' },
		{ name: 'Contact', path: 'contact' }
	];

	let mobileMenuOpen = false;
	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);
	const closeMobileMenu = () => (mobileMenuOpen = false);

	let previousY: number;
	let currentY: number;
	let clientHeight: number;

	let logo!: HTMLElement;

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
			logo,
			{
				y: -20,
				opacity: 0
			},
			{
				opacity: 1,
				y: 0,
				duration: 1.8,
				delay: 1,
				ease: 'power4.out'
			}
		);

		tl.fromTo(
			'[data-gsap="nav-items"]',
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

<div use:storyblokEditable={blok} {...$$restProps}>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if mobileMenuOpen}
		<div class="bg-white sm:hidden" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-20" />
			<div
				in:fade|global
				out:fade|global={{ delay: 500 }}
				class="fixed inset-y-0 right-0 z-20 w-full px-6 py-6 overflow-y-auto bg-black sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flow-root mt-24">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="py-6 space-y-2">
							{#each navigation as { name, path }, i}<a
									href="{base}/{path}"
									class="block px-3 py-2 -mx-3 text-xl font-semibold leading-7 text-white"
									in:fly|global={{ x: -48, duration: 500, delay: 300 + 50 * i }}
									out:fly|global={{ x: -48, duration: 500, delay: 300 - 50 * i }}
									on:click={closeMobileMenu}>{name}</a
								>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<header
		class="grid grid-cols-24 fixed w-full top-0 h-20 3xl:h-24 z-30 transition-transform ease-in mix-blend-difference"
		class:motion-safe:-translate-y-full={offscreen}
		bind:clientHeight
	>
		<nav
			class="col-start-3 py-6 lg:py-9 3xl:py-12 lg:col-start-2 col-span-20 lg:col-span-22"
			aria-label="Global"
		>
			<div class="flex items-center justify-between">
				<a href="{base}/" class="-m-1.5 p-1.5" bind:this={logo}>
					<span class="sr-only">Good Fortune Collective</span>
					<Gfc class="w-auto h-8 text-white 3xl:h-10" alt="" />
				</a>
				<div class="flex sm:hidden">
					<button
						type="button"
						class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
						on:click={toggleMobileMenu}
					>
						<span class="sr-only">{mobileMenuOpen ? 'Close' : 'Open'} main menu</span>
						{#if mobileMenuOpen}
							<svg
								class="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg
								class="w-6 h-6"
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
						{/if}
					</button>
				</div>
				<div class="hidden sm:flex sm:gap-x-12">
					{#each navigation as { name, path }, i}
						<a href="{base}/{path}" class="text-sm leading-6 3xl:text-lg">
							<span data-gsap="nav-items" class="block text-white">{name}</span>
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</header>
</div>
