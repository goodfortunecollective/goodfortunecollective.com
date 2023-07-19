<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	import { ProjectListItem } from '$lib/components';

	export let blok: any;
</script>

<section use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="max-w-6xl mx-auto">
		{#each blok.projects as { name, slug, content }}
			<ProjectListItem {name} {slug} {content} />
		{/each}
	</div>
</section>
