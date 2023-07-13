<script lang="ts">
	import {storyblokEditable} from '@storyblok/svelte';

	import {Link} from '$lib/components';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} class={blok.class}>
	{#if blok.wrapped}
		<div class="max-w-6xl mx-auto px-8">
			<Link {...$$restProps} href={blok.href} label={blok.label}/>
		</div>
	{:else}
		<Link {...$$restProps} href={blok.href} label={blok.label}/>
	{/if}
</div>
