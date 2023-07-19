<script lang="ts">
	import { base } from '$app/paths';
	import ScrollPlane from './ScrollPlane.svelte';
	import { onMount } from 'svelte';

	export let name: string;
	export let slug: string;
	export let content: any;

	onMount(() => {});
</script>

<a href="{base}/work/{slug}" class="ProjectListItem" data-id={slug}>
	<div class="ProjectListItem-thumb">
		<ScrollPlane {slug} {content} {name} />
	</div>

	<div class="ProjectListItem-infos">
		<h2 class="ProjectListItem-title">{name}</h2>
		<div class="uppercase ProjectListItem-client">{content.client}</div>
	</div>
</a>

<style lang="scss">
	@import '../../vars.scss';

	.ProjectListItem {
		display: flex;
		width: 100%;
		flex-direction: column;
		position: relative;
		overflow: visible;
		//margin: 200px 0;
	}

	.ProjectListItem-infos {
	}

	.ProjectListItem-title {
	}

	.ProjectListItem-client {
		color: #a7a89a;
	}

	.ProjectListItem-categories {
		color: #a7a89a;
	}
</style>
