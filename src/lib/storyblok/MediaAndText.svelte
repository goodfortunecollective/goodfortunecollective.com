<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const variants = cva(
		'col-span-10 col-start-2 flex flex-col gap-16 lg:gap-32 transition-colors duration-1000 ease-out',
		{
			variants: {
				layoutDirection: {
					left: 'md:flex-row',
					right: 'md:flex-row-reverse'
				},
				theme: {
					light: '',
					dark: 'text-white'
				}
			},
			defaultVariants: {
				layoutDirection: 'left',
				theme: 'light'
			}
		}
	);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={cls('grid grid-cols-12', blok.class)}>
	<div class={variants({ layoutDirection: blok.layoutDirection, theme: $backgroundTheme })}>
		<div class="flex md:w-1/2">
			<figure>
				<img src={blok.image.filename} alt={blok.id} />
			</figure>
		</div>
		<div class="flex flex-col text-xl md:w-1/2 md:justify-center [&_p]:my-4 [&_p]:leading-8">
			{#each blok.content as b}
				<StoryblokComponent blok={b} />
			{/each}
		</div>
	</div>
</div>
