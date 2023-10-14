<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	$: content = renderRichText(blok.content);

	const variants = cva('', {
		variants: {
			heading: {
				light: '',
				dark: 'text-yellow-50'
			},
			text: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			heading: 'light',
			text: 'light'
		}
	});
</script>

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(blok.class, variants({ text: $backgroundTheme }))}
>
	<div class="grid grid-cols-12 py-10">
		<div class="col-span-10 col-start-2 mb-8 md:col-span-8 md:col-start-3 title">
			<Heading as="h2" size="h1" class={variants({ heading: $backgroundTheme })}
				>{blok.title}</Heading
			>
		</div>
		<div class="col-span-10 col-start-2 mb-8 md:col-span-8 md:col-start-3 list">
			<div class="mb-8 text-center">{@html content}</div>
			<div class="flex-col mt-16 md:flex">
				{#each blok.children as b, i}
					<StoryblokComponent blok={b} index={i} length={blok.children.length} />
				{/each}
			</div>
		</div>
	</div>
</div>
