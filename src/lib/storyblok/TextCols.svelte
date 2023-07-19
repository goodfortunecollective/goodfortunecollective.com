<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';

	export let blok: any;

	const variants = cva('relative', {
		variants: {
			theme: {
				light: '',
				dark: 'bg-gray-900 text-white'
			},
			gap: {
				8: 'md:gap-8',
				16: 'md:gap-16',
				32: 'md:gap-32'
			},
			halign: {
				left: 'text-left',
				centre: 'text-centre',
				right: 'text-right'
			},
			valign: {
				top: 'items-start',
				center: 'items-center',
				bottom: 'items-end'
			}
		},
		defaultVariants: {
			theme: 'light',
			gap: 8,
			halign: 'left',
			valign: 'top'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(variants({ theme: blok.theme }), blok.class)}
>
	<div class="max-w-6xl mx-auto">
		<div class="px-6 xl:px-0">
			<div
				class={cls(
					'flex flex-col lg:flex-row',
					variants({ halign: blok.halign, valign: blok.valign, gap: blok.gap })
				)}
			>
				{#each blok.children as item, i}
					<div class="block lg:flex text-block w-full grow-[1]">
						<StoryblokComponent blok={item} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
