<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { base } from '$app/paths';
	import { dev } from '$app/environment';
	import { Heading } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';

	export let blok: any;

	console.log('blok ', blok);

	const headingStyle = cva('underline underline-offset-4', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			},
			kind: {
				primary: 'text-rose-50 lg:leading-extra-tight leading-extra-tight',
				secondary: 'lg:leading-extra-tight leading-extra-tight',
				tertiary: ''
			}
		},
		defaultVariants: {
			theme: 'light',
			kind: 'secondary'
		}
	});

	const textStyle = cva('text-xs tracking-widest uppercase tag-list', {
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

	const headingSize: any = {
		primary: 'h1',
		secondary: 'h2',
		tertiary: 'h3'
	};
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	{#if blok.article}
		<a class="mb-16 lg:mb-32" href="{base}/culture/{blok.article.slug}">
			<div class="mt-16">
				{#if blok.article.tag_list}
					<span class={cls('flex flex-row gap-2 pb-4', textStyle({ theme: $backgroundTheme }))}>
						{#each blok.article.tag_list as tag}
							<span>#{tag}</span>
						{/each}
					</span>
				{/if}
				<Heading
					as="h2"
					size={headingSize[blok.kind]}
					class={headingStyle({ theme: $backgroundTheme, kind: blok.kind })}
					>{blok.article.content.title}</Heading
				>
			</div>
		</a>
	{/if}
</div>
