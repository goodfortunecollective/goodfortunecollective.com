<script lang="ts">
	import { renderRichText } from '@storyblok/svelte';

	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
	$: list = renderRichText(blok.list);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	{@html content}
	<div
		class="grid grid-cols-2 pt-4 mt-4 text-sm tracking-wide uppercase gap-y-4 md:pt-8 md:mt-12 list"
	>
		{@html list}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.list {
		position: relative;

		&:before,
		&:after {
			position: absolute;
			top: 0;
			left: 0;
			width: 35%;
			height: 1px;
			background: #333;
			content: '';
		}

		&:after {
			left: 50%;
		}

		p {
			margin-bottom: 1rem;
		}
	}
</style>
