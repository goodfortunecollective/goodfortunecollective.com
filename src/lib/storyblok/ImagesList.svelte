<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;

	export let imageClasses = ['md:col-start-14', 'md:col-start-3'];
	export let textClasses = ['md:col-start-3', 'md:col-start-14'];
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={blok.class}>
	<div class="flex flex-col list">
		{#each blok.list as item, i}
			<div class="px-8 py-16 md:px-0 md:grid md:grid-cols-24 md:gap-2 md:py-32 list-item">
				<div class={'list-item-text-cont flex-row md:col-span-9  ' + textClasses[i % 2]}>
					<h2 class="mb-8 text-5xl lg:text-8xl list-item-title font-degular-display">
						{item.title}
					</h2>
					<div class="mb-8 list-item-text md:mb-0">
						<StoryblokComponent blok={item} />
					</div>
				</div>
				<figure class={'list-item-image mt-8 md:mt-0 md:col-span-9 ' + imageClasses[i % 2]}>
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
</style>
