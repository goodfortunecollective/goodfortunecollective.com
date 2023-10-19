<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	$: content = renderRichText(blok.content);

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

<div
	use:storyblokEditable={blok}
	{...$$restProps}
	class={cls(blok.class, textStyle({ theme: $backgroundTheme }))}
>
	<div class="grid grid-cols-12 py-10">
		<div class="title col-span-10 col-start-2 mb-8 md:col-span-8 md:col-start-3">
			<Heading as="h2" size="h1" class={headingStyle({ theme: $backgroundTheme })}
				>{blok.title}</Heading
			>
		</div>
		<div class="list col-span-10 col-start-2 mb-8 md:col-span-8 md:col-start-3">
			<div class="mb-8 text-center">{@html content}</div>
			<div class="mt-16 flex-col md:flex">
				{#each blok.children as b, i}
					<StoryblokComponent blok={b} index={i} length={blok.children.length} />
				{/each}
			</div>
		</div>
	</div>
</div>
