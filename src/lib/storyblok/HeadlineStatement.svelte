<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { Heading } from '$lib/components';

	export let blok: any;

	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col items-stretch gap-12 px-8 pt-16 pb-8 lg:flex-row lg:gap-0">
			<div class="flex flex-col justify-between space md:w-1/2">
				<Heading as="h2" size="h1">{blok.title}</Heading>
				{#if blok.children.length}
					<div class="hidden mt-8 lg:block">
						{#each blok.children as b}
							<StoryblokComponent blok={b} />
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex items-end flex-1 text-xl">
				<div class="pt-0 leading-6 text lg:pt-24">{@html content}</div>
			</div>
			{#if blok.children.length}
				<div class="mt-4 lg:hidden">
					{#each blok.children as b}
						<StoryblokComponent blok={b} />
					{/each}
				</div>
			{/if}
		</div>
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
	}

	.text {
		color: #2c3436;
	}
</style>
