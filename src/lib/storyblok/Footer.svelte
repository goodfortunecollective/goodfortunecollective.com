<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { Gfc } from '$lib/components';
	import gsap from '$lib/gsap';
	import { backgroundTheme, cursorType, isTransitioningEnabled } from '$lib/stores';
	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	import { onMount } from 'svelte';

	export let blok: any;

	let el!: HTMLElement;

	isTransitioningEnabled.subscribe((value) => {
		if (el && gsap) {
			gsap.to(el, {
				opacity: value ? 1 : 0,
				duration: 0.4,
				ease: 'power4.out'
			});
		}
	});

	const hightlightStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: 'before:bg-gray-600',
				dark: 'before:bg-gray-300'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const lineStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: 'before:bg-gray-300 ',
				dark: 'before:bg-gray-500'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	onMount(() => {
		if (!$isTransitioningEnabled) {
			gsap.set(el, { opacity: 0 });
		}
	});

	const onEnter = () => {
		cursorType.set('checkout');
	};

	const onLeave = () => {
		cursorType.set('none');
	};
</script>

<footer
	use:storyblokEditable={blok}
	{...$$restProps}
	bind:this={el}
	id="footer"
	class={cls('relative pt-8 md:pt-32 xl:pt-48', 'c-footer')}
>
	<div class="relative z-[1] w-full py-6">
		<div class="grid grid-cols-12 py-2">
			<div
				use:inview
				on:inview_change={inViewColorTransition}
				class={cls(
					'sb-footer__col',
					'col-span-12 col-start-1 mx-4 pt-8 pb-2 md:col-span-5 md:col-start-2 md:mx-0 lg:col-span-4 lg:col-start-2',
					lineStyle({ theme: $backgroundTheme })
				)}
			>
				<p
					class="3xl:text-sm flex flex-col gap-4 text-xs leading-5 tracking-wider text-gray-500 uppercase md:flex-row"
				>
					Let’s work together
					<a
						use:inview
						on:inview_change={inViewColorTransition}
						on:mouseenter={onEnter}
						on:mouseleave={onLeave}
						class={cls(
							'c-animated-underline text-rose-50',
							hightlightStyle({ theme: $backgroundTheme })
						)}
						href={`mailto:${blok.email}`}>{blok.email}</a
					>
				</p>
			</div>
			<div
				use:inview
				on:inview_change={inViewColorTransition}
				class={cls(
					'sb-footer__col',
					'col-span-12 col-start-1 mx-4 pt-8 pb-2 md:col-span-4 md:col-start-8 md:mx-0',
					lineStyle({ theme: $backgroundTheme })
				)}
			>
				<p
					class="3xl:text-sm flex flex-col gap-4 text-xs leading-5 tracking-wider text-gray-500 uppercase md:flex-row"
				>
					Find us in<a
						href={blok.address}
						use:inview
						on:mouseenter={onEnter}
						on:mouseleave={onLeave}
						on:inview_change={inViewColorTransition}
						class={cls('c-animated-underline', hightlightStyle({ theme: $backgroundTheme }))}
						>Vancouver, Canada</a
					>
				</p>
			</div>
		</div>
		<div class="grid grid-cols-12 py-2">
			<div
				class="col-span-12 col-start-1 mx-4 pt-2 pb-4 text-sm text-gray-400 md:col-span-4 md:col-start-2 md:mx-0 md:pb-0"
			>
				<StoryblokComponent blok={blok.social_links[0]} />
			</div>
			<div
				class="col-span-12 col-start-1 mx-4 md:col-span-4 md:col-start-8 md:mx-0 lg:col-span-4 lg:col-start-8"
			>
				<p class="3xl:text-sm text-xs leading-5 tracking-wider text-gray-500 uppercase">
					&copy; {new Date().getFullYear().toString()} Good Fortune Collective. All rights reserved.
				</p>
			</div>
		</div>
	</div>
	<Gfc
		class={cls(
			'absolute bottom-12 left-2/4 z-0 h-auto w-[66%] max-w-[700px] -translate-x-2/4 translate-y-[35%]',
			$backgroundTheme == 'light' ? 'text-[#faf9f5]' : 'text-black'
		)}
		alt=""
	/>
</footer>

<style lang="scss">
	@use '../../vars' as *;

	.sb-footer__col {
		position: relative;
		@media (min-width: $media-md) {
			overflow: hidden;

			&:before {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				height: 1px;
				content: '';
			}
		}
	}
</style>
