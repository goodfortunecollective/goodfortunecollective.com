<script lang="ts">
	import { onDestroy } from 'svelte';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import gsap from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';

	export let blok: any;

	const textStyle = cva('transition-colors duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-red-100'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	let ctx: any = null;
	let el!: HTMLElement;

	useTransitionReady(() => {
		ctx = gsap.context(() => {
			gsap.utils.toArray<HTMLElement>('[data-gsap="tags-list"]').forEach((parent, index) => {
				const container: HTMLElement | null = parent.querySelector('ul');

				if (container) {
					const startTarget = -parent.offsetWidth / 2 - container.scrollWidth * (index + 1) * 0.1;
					const startTargetNext =
						-parent.offsetWidth / 2 - container.scrollWidth * (index + 4) * 0.1;

					const [x, xEnd] =
						index % 2
							? [startTargetNext, startTargetNext + container.scrollWidth * 0.1]
							: [startTarget, startTarget - container.scrollWidth * 0.1];

					gsap.fromTo(
						container,
						{ x },
						{
							x: xEnd,
							scrollTrigger: {
								trigger: parent,
								scrub: 0.5
							}
						}
					);
				}
			});
		}, el);
	});

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<div use:storyblokEditable={blok} class={blok.class} bind:this={el}>
	<div class="flex flex-col gap-8 py-8">
		{#each Array(4) as _, index (index)}
			<div
				data-gsap="tags-list"
				class="border-b-2 border-b-gray-200 border-opacity-10 last-of-type:border-0"
			>
				<ul class=" whitespace-nowrap">
					{#each blok.tags as b}
						<li class={cls('mb-8 inline-block', textStyle({ theme: $backgroundTheme }))}>
							<span class="mx-8 flex items-center">
								<Heading as="h4" size="h2" class="mr-16 uppercase">
									<StoryblokComponent blok={b} />
								</Heading>
								<span class="4xl:text-8x inline-block font-degular-display text-6xl 3xl:text-7xl"
									>*</span
								>
							</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
