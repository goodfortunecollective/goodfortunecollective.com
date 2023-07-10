<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import Plane from '$lib/components/Plane.svelte';
	import Planes from '$lib/components/Planes.svelte';

	export let blok: any;
</script>

<section use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<Planes>
		{#each blok.projects as { name, slug, content }}
			<Plane {name} {slug} {content} />
		{/each}
	</Planes>
</section>
