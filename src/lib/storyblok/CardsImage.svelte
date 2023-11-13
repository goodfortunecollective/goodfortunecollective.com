<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const variants = cva('h-full w-full transition-c duration-1000 ease-out', {
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

	const containerStyle = cva('relative h-full w-full', {
		variants: {
			aspect: {
				square: 'aspect-square',
				portrait: 'aspect-[2/3]',
				video: 'aspect-video',
				half: 'aspect-[1/2]'
			}
		},
		defaultVariants: {
			aspect: 'video'
		}
	});

	const imageStyle = cva('h-full w-full', {
		variants: {
			objectFit: {
				none: 'object-none',
				fill: 'object-fill',
				contain: 'object-contain',
				cover: 'object-cover'
			}
		},
		defaultVariants: {
			objectFit: 'cover'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<div class="flex h-full w-full flex-col">
		<div class={containerStyle({ aspect: blok.aspect })}>
			<div class="absolute inset-0">
				<img src={blok.asset.filename} alt="" class={imageStyle({ objectFit: blok.objectFit })} />
			</div>
		</div>
	</div>
</div>
