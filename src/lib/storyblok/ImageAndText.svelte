<script lang="ts">
	import { renderRichText, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok: any;
	$: content = renderRichText(blok.content);
</script>

<div use:storyblokEditable={blok} {...$$restProps} class={'image-and-text my-12 ' + blok.class}>
	<div class="flex flex-col gap-8 lg:flex-row">
		<div class="flex md:w-1/2">
			<figure class="image-block">
				<img class="image-block-img" src={blok.image.filename} alt={blok.id} />
			</figure>
		</div>
		<div class="flex flex-col md:w-1/2 md:justify-center">
			{@html content}
		</div>
	</div>
</div>

<style lang="scss">
	.text-block {
		:global(p),
		:global(h3),
		:global(ul) {
			color: #929292;
		}
	}
</style>
