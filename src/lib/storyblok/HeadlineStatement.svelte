<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="pt-8 grid grid-cols-12 lg:pt-[8.33vw] gap-8 lg:gap-0">
		<div class="col-span-10 lg:col-span-4 col-start-2 lg:col-start-2">
			<div class="flex flex-col h-full">
				<Heading as="h2" size="h1" class="flex-1 max-w-screen-md">{blok.title}</Heading>
				{#if blok.children.length}
					<div class="hidden mt-8 lg:flex">
						{#each blok.children as b}
							<StoryblokComponent blok={b} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div class="col-span-10 lg:col-span-5 col-start-2 lg:col-start-7">
			<div
				class="lg:pt-24 text-xl xl:text-2xl 4xl:text-4xl leading-9 4xl:leading-loose max-w-screen-xl"
			>
				<TextTransition>{@html content}</TextTransition>
			</div>
		</div>
		{#if blok.children.length}
			<div class="lg:hidden col-span-10 col-start-2">
				{#each blok.children as b}
					<StoryblokComponent blok={b} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.grey-bg {
		position: relative;
		background: #bec6c4;

		&:before {
			position: absolute;
			bottom: 100%;
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
