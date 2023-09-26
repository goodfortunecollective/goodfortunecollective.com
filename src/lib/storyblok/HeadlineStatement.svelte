<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="pt-8 grid grid-cols-12 lg:pt-[8.33vw] gap-8 lg:gap-0">
		<div class="col-span-10 col-start-2 headline-title lg:col-span-8 lg:col-start-2">
			<div class="flex flex-col h-full">
				<Heading as="h1" size="h1" class="flex-1 max-w-screen-md leading-extra-tight"
					>{blok.title}</Heading
				>
			</div>
		</div>
		{#if blok.children.length}
			<div class="col-span-10 col-start-2 lg:pt-12 lg:col-start-2 lg:col-span-2">
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
		<div class="col-span-10 col-start-2 lg:col-span-6 lg:col-start-5">
			<div
				class="max-w-screen-xl text-xl leading-9 lg:pt-12 xl:text-2xl 4xl:text-4xl 4xl:leading-loose"
			>
				<TextTransition>{@html content}</TextTransition>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.headline-title :global(h1) {
		line-height: 0.85;
	}

	.grey-bg {
		position: relative;
		background: #bec6c4;

		&:before {
			position: absolute;
			bottom: 100%;
			height: var(--header-height);
			right: 0;
			left: 0;
			background: #bec6c4;
			content: '';
		}
	}

	.black-bg {
		background: #1c1c1c;
		color: $white;

		.text {
			color: $white;
		}
	}

	.text {
		color: #2c3436;
	}
</style>
