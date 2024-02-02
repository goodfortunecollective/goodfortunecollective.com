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
				small: 'h-64 2xl:h-72 4xl:h-80' /* 256px */,
				medium: 'h-96 2xl:h-112 4xl:h-128' /* 384px */,
				large: 'h-128 2xl:h-160 4xl:h-192' /* 512px */
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
					scrollTrigger: {
						trigger: scrollEl,
						start: 'center 66%',
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
	use:storyblokEditable={blok}
	{...$$restProps}
	bind:this={el}
	class={cls('relative', blok.class, variants({ theme: $backgroundTheme }))}
>
	{#if blok.title?.length > 0}
		<div class="fixed grid w-full grid-cols-12">
			<div class="col-span-10 col-start-2">
				<Heading
					as="h2"
					animated={true}
					size="h2"
					class="leading-extra-tight lg:leading-extra-tight"
				>
					{blok.title}
				</Heading>
			</div>
		</div>
		<Spacer gap="extra-large" />
	{/if}
	<div class="overflow">
		<div class="grid grid-cols-12" bind:this={scrollEl}>
			<div class="col-span-10 col-start-2 flex gap-8">
				{#each blok.content as b, index}
					<div class={variants({ size: blok.size })}>
						<StoryblokComponent blok={b} {index} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
