<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';
	import { inview } from 'svelte-inview';

	import { Heading } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';
	import { cls } from '$lib/styles';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const containerStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const headingStyle = cva('leading-tightest lg:leading-tightest', {
		variants: {
			maxWidth: {
				md: 'max-w-screen-base 3xl:max-w-screen-basexl',
				lg: 'max-w-screen-lg',
				xl: 'max-w-screen-xl',
				'2xl': 'max-w-screen-2xl'
			}
		},
		defaultVariants: {
			maxWidth: 'md'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(blok.class, containerStyle({ theme: $backgroundTheme }))}
>
	<div class="grid grid-cols-12 gap-8 pt-16 pb-8 lg:gap-0">
		<div
			class={cls(
				'col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 lg:col-start-2  2xl:col-start-3',
				blok.titleFullWidth ? 'lg:col-span-8 2xl:col-span-7' : 'lg:col-span-4 2xl:col-span-5'
			)}
		>
			<Heading
				as="h2"
				animated={blok.animated}
				size={blok.titleSize}
				class={headingStyle({
					maxWidth: blok.maxWidth
				})}
			>
				{blok.title}
			</Heading>
			{#if blok.links.length}
				<div class="mt-8 hidden lg:block">
					{#each blok.links as b}
						<StoryblokComponent blok={b} />
					{/each}
				</div>
			{/if}
		</div>
		<div
			class="col-span-12 col-start-1 mx-4 md:col-span-10 md:col-start-2 md:mx-0 lg:col-span-6 lg:col-start-5 2xl:col-span-5 2xl:col-start-6"
		>
			<div class="flex flex-col gap-8 text-3xl leading-snug">
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
		{#if blok.links.length}
			<div class="lg:hidden">
				{#each blok.links as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
	</div>
</div>
