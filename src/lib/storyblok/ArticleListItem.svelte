<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { base } from '$app/paths';
	import { Heading } from '$lib/components';
	import { backgroundTheme, heading_hover_media } from '$lib/stores';

	export let blok: any;

	const headingStyle = cva('transition-colors duration-1000 ease-out no-underline', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			},
			kind: {
				primary: 'text-rose-50 lg:leading-tightest leading-tightest',
				secondary: 'lg:leading-tightest leading-tightest',
				tertiary: ''
			}
		},
		defaultVariants: {
			theme: 'light',
			kind: 'secondary'
		}
	});

	const textStyle = cva(
		'flex flex-row gap-2 pb-4 text-xs tracking-widest uppercase transition-colors duration-1000 ease-out',
		{
			variants: {
				theme: {
					light: '',
					dark: 'text-white'
				}
			},
			defaultVariants: {
				theme: 'light'
			}
		}
	);

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
					<span class={textStyle({ theme: $backgroundTheme })}>
						{#each blok.article.tag_list as tag}
							<span>#{tag}</span>
						{/each}
					</span>
				{/if}
				<Heading
					as="h2"
					size={headingSize[blok.kind]}
					underline
					class={headingStyle({ theme: $backgroundTheme, kind: blok.kind })}
					>{blok.article.content.title}
				</Heading>
			</span>
		</a>
	{/if}
</div>
