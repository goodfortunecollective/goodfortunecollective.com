<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { cva } from 'class-variance-authority';

	import { Heading } from '$lib/components';
	import { backgroundTheme } from '$lib/stores';
	import { cls } from '$lib/styles';

	export let blok: any;

	type RichtextDoc = {
		type: 'doc';
		content: unknown[];
	};

	const isRichtextField = (value: unknown): value is RichtextDoc => {
		return (
			typeof value === 'object' &&
			value !== null &&
			'type' in value &&
			'content' in value &&
			(value as { type?: string }).type === 'doc' &&
			Array.isArray((value as { content?: unknown }).content)
		);
	};

	const normalizeHeadingRichText = (content: string) => {
		return content.replace(/<\/p>\s*<p>/g, '<br/>').replace(/^<p>/, '').replace(/<\/p>$/, '');
	};

	$: titleField = blok.title ?? blok.text;
	$: titleRichText = isRichtextField(titleField)
		? normalizeHeadingRichText(renderRichText(titleField as any) ?? '')
		: '';
	$: titlePlainText = typeof titleField === 'string' ? titleField : '';

	const headingStyle = cva('duration-1000 ease-out', {
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

<div use:storyblokEditable={blok}>
	<Heading
		{...$$restProps}
		as={blok.as}
		size={blok.size}
		leading={blok.leading}
		class={cls(blok.autoTheme && headingStyle({ theme: $backgroundTheme }), blok.class)}
		animated={blok.animated}
	>
		{#if titleRichText}
			<span>{@html titleRichText}</span>
		{:else}
			{titlePlainText}
		{/if}
	</Heading>
</div>
