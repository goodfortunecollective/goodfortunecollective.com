<script lang="ts">
	import {storyblokEditable, StoryblokComponent} from '@storyblok/svelte';

	import {Heading} from '$lib/components';

	export let blok: any;

	export let titleClass = 'md:col-span-4 list-item list-item-title mb-12';
	if (blok.titleSide == 'right') titleClass += ' md:order-2';

	export let textClass = 'md:col-span-6 list-item list-item-text mb-12 md:mb-24';
	export let textCols = [
		'md:col-start-6 md:mt-24',
		'md:col-start-2',
		'md:col-start-5',
		'md:col-start-3'
	];
	export let textClasses = [];

	if (blok.titleSide == 'right') {
		textCols = ['md:col-start-1 md:mt-24', 'md:col-start-6', 'md:col-start-2', 'md:col-start-4'];
	}

	for (let i = 0; i < textCols.length; i++) {
		textClasses[i] = textClass + ' ' + textCols[i];
	}
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={'max-w-6xl mx-auto ' + blok.class}>
	<div class="px-6">
		<div class="list md:grid md:grid-cols-12 md:gap-2 py-16 md:py-32 title-side-{blok.titleSide}">
			<div class={titleClass}>
				<Heading as="h3" size="h2">{blok.title}</Heading>
			</div>

			{#each blok.list as item, i}
				<div class={textClasses[i % 4]}>
					<div class="text-lg font-bold list-item-number">
						{#if i <= 10}0{/if}{i + 1}
					</div>
					<div class="text-xl list-item-content">
						<p>
							<StoryblokComponent blok={item}/>
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.list {
		color: $grayDark;

		.list-item-text {
			&:last-child {
				margin-bottom: 0;
			}

			@media (min-width: $media-md) {
				&:nth-child(2) {
					order: 1;
				}

				@include nth-child-order(3, 12);
			}
		}

		.list-item-number {
			position: relative;
			width: calc(2% / 10) * 100;
			@media (min-width: $media-md) {
				width: calc(2% / 12) * 100;
			}

			&:after {
				position: absolute;
				top: 14px;
				right: 15px;
				left: 30px;
				height: 1px;
				background: $blackPure;
				content: '';
			}
		}

		.list-item-content {
			width: calc(8% / 10) * 100;
			@media (min-width: $media-md) {
				width: calc(8% / 12) * 100;
			}
		}
	}

	.list-item {
		display: flex;

		// &:nth-child(2) {
		// 	margin-left: 20%;
		// }
	}

	.list-title {
		@media (min-width: screen-sm-min) {
		}
	}
</style>
