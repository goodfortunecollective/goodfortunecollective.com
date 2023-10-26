<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	const variants = cva('w-80', {
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

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(variants({ theme: $backgroundTheme }), blok.class)}
>
	<div class="flex flex-col">
		<div class="relative aspect-square w-full">
			<div class="absolute inset-0">
				<img src={blok.asset.filename} alt="" class="h-full w-full object-cover" />
			</div>
		</div>
	</div>
</div>
