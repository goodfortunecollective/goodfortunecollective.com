<script lang="ts">
	import {storyblokEditable, StoryblokComponent} from '@storyblok/svelte';

	export let blok: any;

	export let titleClasses = ['md:col-start-5', 'md:col-start-11'];
	export let imageClasses = ['md:col-start-1', 'md:col-start-14'];
	export let textClasses = ['md:col-start-14', 'md:col-start-4'];
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={'images-list-block ' + blok.class}>
	<div class="flex flex-col list">
		{#each blok.list as item, i}
			<div class="flex px-8 py-16 md:px-0 md:grid md:grid-cols-24 md:gap-2 md:py-32 list-item">
				<div class={'list-item-title-cont mb-8 flex flex-row md:col-span-8 ' + titleClasses[i % 2]}>
					<div class="text-lg font-bold list-item-number">
						{#if i <= 10}0{/if}{i + 1}
					</div>
					<h2 class="text-4xl list-item-title">{item.title}</h2>
				</div>
				<div class={'list-item-text mb-8 md:mb-0 md:col-span-8 ' + textClasses[i % 2]}>
					<StoryblokComponent blok={item}/>
				</div>
				<figure class={'list-item-image md:col-span-12 ' + imageClasses[i % 2]}>
					<img src={item.image.filename} alt={item.title}/>
				</figure>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.images-list-block {
		background: #1c1c1c;
		color: $white;
	}

	.list {
		// color: $grayDark;
	}

	.list-item {
		&:last-child {
			margin-bottom: 0;
		}

		@media (min-width: $media-md) {
			&:nth-child(2n + 1) {
				.list-item-text {
					order: 3;
				}

				.list-item-image {
					order: 2;
				}
			}
		}
	}

	.list-item-number {
		position: relative;
		width: calc(2% / 10) * 100;
		@media (min-width: $media-md) {
			width: calc(3% / 8) * 100;
		}

		&:after {
			position: absolute;
			top: 14px;
			right: 15px;
			left: 30px;
			height: 1px;
			background: $white;
			content: '';
		}
	}

	.list-item-title {
		width: calc(8% / 10) * 100;
		@media (min-width: $media-md) {
			width: calc(5% / 8) * 100;
		}
	}

	.list-title {
		@media (min-width: screen-sm-min) {
		}
	}
</style>
