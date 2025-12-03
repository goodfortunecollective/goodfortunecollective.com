<script lang="ts">
	import { onDestroy } from 'svelte';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { Heading } from '$lib/components';
	import gsap from '$lib/gsap';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const textStyle = cva('duration-1000 ease-out', {
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
					const startTarget = -parent.offsetWidth - container.scrollWidth * (index + 1) * 0.15;

					const [x, xEnd] =
						index % 2
							? [startTarget, startTarget + container.scrollWidth * 0.04]
							: [startTarget, startTarget + container.scrollWidth * 0.03];

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
				class="border-opacity-10 border-b-2 border-b-gray-200 last-of-type:border-0"
			>
				<ul class="whitespace-nowrap">
					{#each Array(2) as _, index (index)}
						{#each blok.tags as b}
							<li
								class={cls('mb-8 inline-block', textStyle({ theme: $backgroundTheme }))}
								use:inview
								on:inview_change={inViewColorTransition}
							>
								<span class="mx-8 flex items-center">
									<Heading
										as="h4"
										size="h2"
										class="4xl:text-9xl mr-16 text-5xl uppercase lg:text-8xl"
										animated={false}
									>
										<StoryblokComponent blok={b} />
									</Heading>
									<span
										class="font-degular-display 3xl:text-9xl 4xl:text-10xl inline-block text-6xl xl:text-8xl"
									>
										*
									</span>
								</span>
							</li>
						{/each}
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
