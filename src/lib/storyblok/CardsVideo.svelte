<script lang="ts">
	import { inview } from 'svelte-inview';
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { Video } from '$lib/components';
	import { inViewColorTransition } from '$lib/utils/animations';

	export let blok: any;

	const variants = cva('h-full w-full duration-1000 ease-out', {
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
	use:inview
	on:inview_change={inViewColorTransition}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<div class="flex h-full w-full flex-col">
		<div class={containerStyle({ aspect: blok.aspect })}>
			<div class="absolute inset-0">
				<Video
					videoUrl={blok.asset}
					autoplay
					muted
					loop
					animated={false}
					class={imageStyle({ objectFit: blok.objectFit })}
				/>
			</div>
		</div>
	</div>
</div>
