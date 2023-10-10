<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';

	import { Draggable } from '$lib/gsap';
	import { Heading } from '$lib/components';
	import { useTransitionReady } from '$lib/utils/useTransitionReady';
	import TextTransition from '$lib/components/TextTransition.svelte';

	export let blok: any;
	$: content = renderRichText(blok.content);

	let blockClasses = 'process-block flex py-12 overflow-hidden';
	let wrapperClasses = 'process-wrapper draggable flex md:flex-row flex-nowrap gap-4 md:gap-16';
	let listItemClass =
		'flex flex-col list-item-block px-3 pt-3 pb-5 md:px-10 md:pt-10 md:pb-16 justify-between';
	let listItemClasses = [];
	let listItemDraggable = null;
	let listItemWrapper!: HTMLElement;

	for (let i = 0; i < blok.list.length; i++) {
		listItemClasses[i] = listItemClass;

		if (i == 0) listItemClasses[i] += ' ml-8 md:ml-36';
		else if (i == blok.list.length - 1) listItemClasses[i] += ' mr-8';
	}

	useTransitionReady(() => {
		listItemDraggable = Draggable.create('.process-wrapper', {
			type: 'x',
			bounds: '.process-block',
			inertia: true
		});
	});
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="grid grid-cols-12 process-title">
		<div class="col-span-10 col-start-2">
			<Heading as="h2" size="h2" class="">{blok.title}</Heading>
		</div>
	</div>
	<div class={blockClasses}>
		<div class={wrapperClasses} bind:this={listItemWrapper}>
			{#each blok.list as item, i}
				<div class={listItemClasses[i]}>
					<span class="text-sm font-bold tracking-widest uppercase caption-number"
						>{#if i <= 10}0{/if}{i + 1}</span
					>
					<div class="text">
						<Heading as="h3" size="h2" class="lg:text-6xl"
							>{item.content.content[0].content[0].text}</Heading
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-12 pt-10 pb-12 md:pt-32 process-text md:pb-36">
		<div class="col-span-10 col-start-2 md:col-span-6 md:col-start-4">
			<TextTransition>{@html content}</TextTransition>
		</div>
	</div>
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

	.process-block {
		height: 70vh;
	}

	.list-item-block {
		position: relative;
		height: 100%;
		background: #dbd5bf; //$beige;
		border-radius: 15px;
		color: #fff;
		width: 50vw;

		@media (min-width: $media-md) {
			width: 29vw;
		}
	}

	.caption-number {
		position: relative;
		margin-right: 70px;
		color: black;
	}
</style>
