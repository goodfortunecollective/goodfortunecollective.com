<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { base } from '$app/paths';
	import { Heading } from '$lib/components';
	import { backgroundTheme, heading_hover_media } from '$lib/stores';

	export let blok: any;

	const headingStyle = cva('no-underline', {
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

	const textStyle = cva('text-xs tracking-widest uppercase', {
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

	function handleMouseEnter() {
		heading_hover_media.set(blok.article.content.thumbnail.filename);
	}

	function handleMouseLeave() {
		heading_hover_media.set(null);
	}
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	{#if blok.article}
		<a
			class="mb-16 lg:mb-32"
			href="{base}/culture/{blok.article.slug}"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		>
			<span class="mt-16 inline-block">
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
					underline
					class={cls(headingStyle({ theme: $backgroundTheme, kind: blok.kind }), 'cool-link')}
					>{blok.article.content.title}
				</Heading>
			</span>
		</a>
	{/if}
</div>
