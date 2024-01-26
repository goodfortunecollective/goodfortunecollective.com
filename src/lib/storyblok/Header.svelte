<script lang="ts">
	import { inview } from 'svelte-inview';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { storyblokEditable } from '@storyblok/svelte';

	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import gsap from '$lib/gsap';
	import { Gfc, HoverText } from '$lib/components';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	let ready = false;
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
		gsap.set(logo, { opacity: 0, y: -20 });
		gsap.set('[data-gsap="nav-items"]', { opacity: 0, y: -20 });
	});

	useTransitionReady(() => {
		if (ready) return;

		ready = true;

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
				delay: 0.4,
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
				delay: 0.2,
				ease: 'power4.out'
			},
			'<'
		);
	});

	function getRootPathname(url: string) {
		const segments = url.split('/');
		if (segments.length > 1) {
			return `${segments[1]}`;
		}
		return '';
	}
</script>

<svelte:window bind:scrollY={currentY} />

<div use:storyblokEditable={blok} {...$$restProps}>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if mobileMenuOpen}
		<div class="bg-white sm:hidden" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-20" />
			<div
				in:fade
				out:fade={{ delay: 500 }}
				class="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="mt-24 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							{#each blok.navigation as { name, slug }, i}<a
									href="{base}/{slug}"
									class="-mx-3 block px-3 py-2 text-xl font-semibold leading-7 text-white"
									in:fly={{ x: -48, duration: 500, delay: 300 + 50 * i }}
									out:fly={{ x: -48, duration: 500, delay: 300 - 50 * i }}
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
		class="fixed top-0 z-30 grid h-20 w-full grid-cols-24 mix-blend-difference transition-transform ease-in 3xl:h-24"
		class:motion-safe:-translate-y-full={offscreen}
		bind:clientHeight
	>
		<nav
			class="col-span-20 col-start-3 py-6 lg:col-span-22 lg:col-start-2 lg:py-9 3xl:py-12"
			aria-label="Global"
		>
			<div class="flex items-center justify-between">
				<a href="{base}/" class="-m-1.5 p-1.5" bind:this={logo}>
					<span class="sr-only">Good Fortune Collective</span>
					<Gfc class="h-8 w-auto text-white 3xl:h-10" alt="" />
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
								class="h-6 w-6"
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
						{/if}
					</button>
				</div>
				<div class="hidden sm:flex sm:gap-x-12">
					{#each blok.navigation as { name, slug }, i}
						<a
							href="{base}/{slug}"
							class={cls(
								getRootPathname($page.url.pathname) !== slug && 'c-animated-underline',
								'text-base leading-6 3xl:text-lg'
							)}
						>
							<span
								data-gsap="nav-items"
								use:inview
								on:inview_change={inViewColorTransition}
								class={cls(
									'block text-stone-450  duration-200 hover:text-white',
									getRootPathname($page.url.pathname) === slug && 'text-white'
								)}
							>
								<HoverText label={name} />
							</span>
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</header>
</div>
