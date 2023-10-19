<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const headingStyle = cva('', {
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

	const textStyle = cva('', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 gap-8 pt-24 md:pt-32 md:gap-0">
		<Heading
			as="h2"
			size="h6"
			class={cls(
				'w-full col-span-10 col-start-2 font-bold tracking-widest uppercase md:col-start-3 md:col-span-3 xl:w-[75%] title break-keep',
				headingStyle({ theme: $backgroundTheme })
			)}>{blok.heading}</Heading
		>
		<div class="col-span-10 col-start-2 text-lg md:col-start-7 md:col-span-5">
			<div class={cls('flex flex-col gap-{blok.gap}', textStyle({ theme: $backgroundTheme }))}>
				{#each blok.content as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		</div>
	</div>
</div>
