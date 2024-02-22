<script lang="ts">
	import { inview } from 'svelte-inview';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const headingStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-yellow-50'
			},
			textAlign: {
				true: 'md:col-span-4 md:col-start-2 2xl:col-start-3  2xl:col-span-3',
				false: 'md:col-span-3 md:col-start-3'
			}
		},
		defaultVariants: {
			theme: 'light',
			textAlign: false
		}
	});

	const textStyle = cva('duration-1000 ease-out', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			},

			gap: {
				1: 'gap-1',
				2: 'gap-2',
				4: 'gap-4',
				8: 'gap-8',
				16: 'gap-16'
			}
		},
		defaultVariants: {
			theme: 'light',
			gap: 4
		}
	});

	const dividerStyle = cva('h-px w-full duration-1000 ease-out', {
		variants: {
			theme: {
				light: 'bg-gray-300',
				dark: 'bg-gray-600'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 gap-8 pt-24 md:gap-0">
		{#if blok.divider}
			<div
				class="col-span-12 col-start-1 flex pb-20 md:col-span-5 md:col-start-7 md:pb-24 2xl:col-span-4 2xl:col-start-7"
			>
				<div class={cls(dividerStyle({ theme: $backgroundTheme }))}></div>
			</div>
		{/if}

		<Heading
			on:inview_change={inViewColorTransition}
			as="h2"
			size="h6"
			class={cls(
				'col-span-10 col-start-2 w-full break-keep font-bold uppercase tracking-widest xl:w-[75%]',
				headingStyle({ theme: $backgroundTheme, textAlign: blok.heading_leftAlign })
			)}>{blok.heading}</Heading
		>
		<div
			class="col-span-10 col-start-2 text-lg md:col-span-5 md:col-start-7 2xl:col-span-4 2xl:col-start-7"
		>
			<div
				use:inview
				on:inview_change={inViewColorTransition}
				class={cls('flex flex-col', textStyle({ theme: $backgroundTheme, gap: blok.gap }))}
			>
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
