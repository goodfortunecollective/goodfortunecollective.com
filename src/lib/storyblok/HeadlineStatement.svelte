<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading, RichtextTransition } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const headingStyle = cva(
		'flex-1 lg:leading-extra-tight leading-extra-tight transition-c duration-1000 ease-out',
		{
			variants: {
				theme: {
					light: '',
					dark: 'text-yellow-50'
				},
				maxWidth: {
					md: 'max-w-screen-md',
					lg: 'max-w-screen-lg',
					xl: 'max-w-screen-xl',
					'2xl': 'max-w-screen-2xl'
				},
				lineHeight: {
					none: '',
					'extra-tight': 'leading-extra-tight lg:leading-extra-tight',
					tightest: 'leading-tightest lg:leading-tightest'
				}
			},
			defaultVariants: {
				theme: 'light',
				maxWidth: 'md',
				lineHeight: 'none'
			}
		}
	);

	const textStyle = cva('transition-c duration-1000 ease-out', {
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

	const childrenStyle = cva('col-span-10 col-start-2  ', {
		variants: {
			align: {
				left: 'lg:col-span-2 lg:col-start-2 lg:pt-12',
				right: 'flex lg:justify-end lg:-translate-y-16'
			}
		},
		defaultVariants: {
			align: 'left'
		}
	});

	$: content = renderRichText(blok.content);
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="pt-18 grid grid-cols-12 gap-8 pt-32 lg:gap-0 lg:pt-[25vh]">
		<div class="col-span-10 col-start-2">
			<div class="flex h-full flex-col">
				<Heading
					as="h1"
					size="h1"
					class={headingStyle({
						theme: $backgroundTheme,
						maxWidth: blok.maxWidth,
						lineHeight: blok.lineHeight
					})}
					>{blok.title}
				</Heading>
			</div>
		</div>
		{#if blok.children.length}
			<div class={childrenStyle({ align: blok.align })}>
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
		{#if content}
			<div class="col-span-10 col-start-2 lg:col-span-6 lg:col-start-5">
				<div
					class="max-w-screen-xl text-xl leading-9 lg:pt-12 xl:text-2xl 4xl:text-4xl 4xl:leading-loose"
					{...$$restProps}
				>
					<RichtextTransition>{@html content}</RichtextTransition>
				</div>
			</div>
		{/if}
	</div>
</div>
