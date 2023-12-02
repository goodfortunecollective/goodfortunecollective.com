<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const headingStyle = cva('transition-colors duration-1000 ease-out', {
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

	const textStyle = cva('transition-colors duration-1000 ease-out', {
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
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 gap-8 pt-24 md:gap-0 md:pt-32">
		<Heading
			as="h2"
			size="h6"
			class={cls(
				'col-span-10 col-start-2 w-full break-keep font-bold uppercase tracking-widest md:col-span-3 md:col-start-3 xl:w-[75%]',
				headingStyle({ theme: $backgroundTheme })
			)}>{blok.heading}</Heading
		>
		<div class="col-span-10 col-start-2 text-lg md:col-span-5 md:col-start-7">
			<div class={cls('flex flex-col', textStyle({ theme: $backgroundTheme, gap: blok.gap }))}>
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
