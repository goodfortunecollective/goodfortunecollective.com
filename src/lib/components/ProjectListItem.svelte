<script lang="ts">
	import { onDestroy } from 'svelte';
	import { cva } from 'class-variance-authority';
	import { renderRichText } from '@storyblok/svelte';

	import { base } from '$app/paths';
	import { cls } from '$lib/styles';
	import gsap, { ScrollTrigger } from '$lib/gsap';
	import { ScrollPlane, Heading } from '$lib/components';
	import { project_list_hover, isTransitioning } from '$lib/stores';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let name: string;
	export let slug: string;
	export let content: any;
	export let layout: 'left' | 'right' = 'left';
	export let theme: 'light' | 'dark' = 'light';
	export let parallaxSpeed: string = '1';

	$: description = renderRichText(content.description);
	$: innerWidth = 0;

	let ctx: any = null;
	let el!: HTMLElement;

	const variants = cva('transition-colors duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			},
			layout: {
				left: '',
				right: 'items-end'
			}
		},
		defaultVariants: {
			theme: 'light',
			layout: 'left'
		}
	});

	function onEnter() {
		project_list_hover.set(name);
	}

	const onLeave = () => {
		// reset hover title only if we're not transitioning
		if (!$isTransitioning) {
			project_list_hover.set(null);
		}
	};

	useTransitionReady(() => {
		ctx = gsap.context(() => {
			// apply parallax effect to any element with a data-speed attribute
			if (innerWidth < 1024) return;

			gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((parent) => {
				gsap.to(parent, {
					y: function () {
						return (
							(1 - parseFloat(parent.getAttribute('data-speed'))) *
							(ScrollTrigger.maxScroll(window) -
								(this.scrollTrigger ? this.scrollTrigger.start : 0))
						);
					},
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top bottom',
						end: 'max',
						invalidateOnRefresh: true,
						scrub: true
					}
				});
			});
		}, el);
	});

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<svelte:window bind:innerWidth />

<div class={cls('pointer-events-none mb-24 lg:mb-0', $$props.class)} bind:this={el}>
	<a
		href="{base}/work/{slug}"
		data-id={slug}
		data-speed={parallaxSpeed}
		class={cls(
			'flex-no-wrap pointer-events-auto flex w-full flex-col',
			variants({ theme: theme, layout: layout }),
			'c-project-list-item__container'
		)}
	>
		<div
			class="relative w-full will-change-transform"
			on:mouseenter={onEnter}
			on:mouseleave={onLeave}
		>
			<ScrollPlane {slug} {content} {name} />
		</div>

		<div class="mt-8">
			<Heading
				as="h6"
				size="h6"
				animated={false}
				class="font-bold uppercase tracking-widest text-stone-450 lg:text-sm"
			>
				{content.category && content.category[0]}
			</Heading>
			<Heading as="h3" size="h3" animated={false} class="my-2 text-3xl font-medium">
				{name}
			</Heading>
			<Heading
				animated={false}
				as="h5"
				size="h5"
				class="uppercase tracking-wide text-stone-450 lg:text-sm">{content.brand}</Heading
			>
			<div class="text-md mt-4 max-w-md overflow-hidden font-medium">
				<span
					class={cls('block transition-transform lg:translate-y-full', 'c-project-list-item__desc')}
					>{@html description}</span
				>
			</div>
		</div>
	</a>
</div>

<style lang="scss">
	.c-project-list-item {
		&__container {
			&:hover {
				.c-project-list-item {
					&__desc {
						transform: translateY(0%);
					}
				}
			}
		}
	}
</style>
