<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
	export let index: any;
	export let length: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	<div
		class={'align-center member flex flex-row py-4 text-left' +
			(index == length - 1 ? ' last' : '')}
	>
		<div class="member-title w-2/3 text-xl">
			{blok.title}
		</div>
		<div class="member-position w-1/3 text-sm font-bold uppercase tracking-widest">
			{blok.position}
		</div>
		{#if blok.thumbnail.filename}
			<figure class="member-image absolute hidden w-auto md:block">
				<img class="member-img" src={blok.thumbnail.filename} alt={blok.title} />
			</figure>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.member {
		position: relative;
		cursor: default;
		border-bottom: 1px solid #797d7e;

		&.last {
			border-bottom: none;
		}

		@media (min-width: $media-md) {
			&:hover {
				.member-image {
					opacity: 1;
				}
			}
		}
	}

	.member-image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
	}

	.member-img {
		max-width: 200px;
		height: auto;
	}
</style>
