<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	import gsap from '$lib/gsap';
	import { useTransitionReady } from '$lib/utils/useTransitionReady.js';

	import { Heading } from '$lib/components';
	import Spacer from '$lib/components/Spacer.svelte';

	export let blok: any;

	let el!: HTMLElement;
	let scrollEl!: HTMLElement;
	let ctx: any = null;

	$: innerWidth = 0;

	const variants = cva('w-full', {
		variants: {
			size: {
				small: 'h-48 md:h-64 2xl:h-72 4xl:h-80' /* 256px */,
				medium: 'h-72 md:h-96 2xl:h-112 4xl:h-128' /* 384px */,
				large: 'h-96 md:h-128 2xl:h-160 4xl:h-224' /* 512px */
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

	useTransitionReady(
		() => {
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
						start: blok.title?.length > 0 ? 'center 66%' : 'center center',
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
		},
		() => {
			ctx?.revert();
		}
	);
</script>

<svelte:window bind:innerWidth />

<div
	bind:this={el}
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('relative', blok.class, variants({ theme: $backgroundTheme }))}
>
	<div>
		{#if blok.title?.length > 0}
			<div class="fixed grid w-full grid-cols-12">
				<div class="col-span-10 col-start-2 2xl:col-span-8 2xl:col-start-3">
					<Heading as="h2" animated={true} size="h2" leading="tightest">
						{blok.title}
					</Heading>
				</div>
			</div>
			<Spacer gap="extra-large" />
		{/if}
		<div class={cls('overflow', blok.title?.length > 0 && 'pt-4')}>
			<div class="grid grid-cols-12" bind:this={scrollEl}>
				<div class="col-span-10 col-start-2 flex gap-8 2xl:col-span-8 2xl:col-start-3">
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
