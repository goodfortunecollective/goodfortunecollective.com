<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;

	export let imageClasses = ['md:col-start-14', 'md:col-start-3'];
	export let textClasses = ['md:col-start-3', 'md:col-start-14'];
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="list flex flex-col">
		{#each blok.list as item, i}
			<div class="list-item px-8 py-16 md:grid md:grid-cols-24 md:gap-2 md:px-0 md:py-32">
				<div class={'list-item-text-cont flex-row md:col-span-9  ' + textClasses[i % 2]}>
					<h2 class="list-item-title mb-8 font-degular-display text-5xl lg:text-8xl">
						{item.title}
					</h2>
					<div class="list-item-text mb-8 md:mb-0">
						<StoryblokComponent blok={item} />
					</div>
				</div>
				<figure
					class={'list-item-image flex md:col-span-9 ' +
						(item.image_position ? 'items-' + item.image_position : '') +
						' ' +
						imageClasses[i % 2]}
				>
					<img src={item.image.filename} alt={item.title} />
				</figure>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.list-item {
		&:last-child {
			margin-bottom: 0;
		}

		@media (min-width: $media-md) {
			&:nth-child(2n + 0) {
				.list-item-text-cont {
					order: 2;
				}

				.list-item-image {
					order: 1;
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
			background: currentColor;
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
