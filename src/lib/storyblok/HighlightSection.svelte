<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading, Spacer } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const textStyle = cva('transition-colors duration-1000 ease-out', {
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
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls('relative grid grid-cols-12', blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="col-span-10 col-start-3">
		<video class="aspect-video w-full" src={blok.video} autoplay={true} loop={true} muted={true}>
			<track kind="captions" />
		</video>
	</div>
	<div class=" col-span-10 col-start-2">
		<div class=" max-w-[600px] -translate-y-28">
			<Heading as="h2" size="h2"
				>{blok.title}<span class="text-white">{blok.highlight}</span></Heading
			>
			<Spacer gap="extra-large" />
			<a href={blok.link.cached_url}
				><Heading size="h2" underline as="h4" class="text-rose-50 underline">{blok.label}</Heading
				></a
			>
		</div>
	</div>
</div>
