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

	const textStyle = cva('', {
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
					const [x, xEnd] =
						index % 2
							? ['100%', (container.scrollWidth - parent.offsetWidth) * -1]
							: [container.scrollWidth * -1, 0];

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
			<div data-gsap="tags-list" class="border-b-2 border-b-gray-200 last-of-type:border-0">
				<ul class=" whitespace-nowrap">
					{#each blok.tags as b}
						<li class={cls('inline-block mb-8', textStyle({ theme: $backgroundTheme }))}>
							<span class="flex mx-8 items-baseline">
								<Heading class="uppercase mr-16">
									<StoryblokComponent blok={b} />
								</Heading>
								<span class="text-8xl 3xl:text-9xl 4xl:text-10x inline-block">*</span>
							</span>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
