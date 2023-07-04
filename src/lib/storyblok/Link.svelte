<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Link } from '$lib/components/layout';

	export let blok: any;
	export let isWrapped = false;

	if (blok.class.indexOf('wrapped') >= 0) {
		isWrapped = true;
	}
</script>

<div use:storyblokEditable={blok} class={blok.class}>
	{#if !isWrapped}
		<Link {...$$restProps} href={blok.href} class={blok.class} label={blok.label} />
	{:else}
		<div class="max-w-6xl mx-auto">
			<div class="px-8 py-8">
				<Link {...$$restProps} href={blok.href} class={blok.class} label={blok.label} />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../vars.scss';

	.grey-bg {
		position: relative;
		background: #bec6c4;
	}
</style>
