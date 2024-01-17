<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import { cva } from 'class-variance-authority';
	import { renderRichText } from '@storyblok/svelte';

	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	import { base } from '$app/paths';
	import { cls } from '$lib/styles';
	import { ScrollPlane, Heading, RichtextAnimated, Parallax } from '$lib/components';
	import { project_list_hover, isTransitioning } from '$lib/stores';
	import gsap from '$lib/gsap';
	import { cursorType } from '$lib/stores';

	export let name: string;
	export let slug: string;
	export let content: any;
	export let layout: 'left' | 'right' = 'left';
	export let theme: 'light' | 'dark' = 'light';
	export let parallaxSpeed: number = 1;

	$: description = renderRichText(content.description);

	let descriptionTextRef: RichtextAnimated | null = null;

	let isActive = false;
	let ctx: any = null;
	let el!: HTMLElement;

	const variants = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: 'text-black',
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

		descriptionTextRef?.animateIn();
		cursorType.set('checkout');
	}

	const onLeave = () => {
		// reset hover title only if we're not transitioning
		if (!$isTransitioning) {
			project_list_hover.set(null);
		}

		descriptionTextRef?.animateOut();
		cursorType.set('none');
	};

	const inViewItem = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		const { inView, node } = detail as ObserverEventDetails;
		node.style.transitionProperty = inView ? 'color' : 'none';

		if (!isActive && inView) {
			isActive = true;
		}
	};

	onMount(() => {
		gsap.set(el, { opacity: 0, y: 100 });
	});

	useTransitionReady(() => {
		ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{
					opacity: 0,
					y: 100
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					ease: 'power3.out'
				}
			);
		}, el);
	});

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<div class={cls('pointer-events-none mb-24 lg:mb-0', $$props.class)} bind:this={el}>
	<Parallax speed={parallaxSpeed} class="self-start" id={slug}>
		<a
			href="{base}/work/{slug}"
			data-id={slug}
			use:inview
			on:inview_change={inViewItem}
			class={cls(
				'flex-no-wrap pointer-events-auto flex w-full flex-col hover:no-underline',
				variants({ theme: theme, layout: layout })
			)}
		>
			<div class="relative w-full" on:mouseenter={onEnter} on:mouseleave={onLeave} role="group">
				<div class="flex aspect-video overflow-hidden">
					{#if isActive}
						<ScrollPlane {content} {name} />
					{/if}
				</div>
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
					<RichtextAnimated bind:this={descriptionTextRef}>
						<span class="wrap" />{@html description}
					</RichtextAnimated>
				</div>
			</div>
		</a>
	</Parallax>
</div>
