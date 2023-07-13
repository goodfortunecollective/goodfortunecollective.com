<script lang="ts">
	import {storyblokEditable, StoryblokComponent} from '@storyblok/svelte';

	export let blok: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	{#each blok.children as b}
		<StoryblokComponent blok={b}/>
	{/each}
</div>

<style lang="scss">
	@import '../../vars.scss';

	.grey-bg {
		background: #bec6c4;
	}

	.black-bg {
		background: #1c1c1c;
		color: $white;
	}
</style>
