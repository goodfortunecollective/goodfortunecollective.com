<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { Link } from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} class={blok.class}>
	{#if blok.wrapped}
		<div class="grid grid-cols-12">
			<div class="col-span-10 col-start-2">
				<Link {...$$restProps} href={blok.href.cached_url} label={blok.label} />
			</div>
		</div>
	{:else}
		<Link {...$$restProps} href={blok.href.cached_url} label={blok.label} />
	{/if}
</div>
