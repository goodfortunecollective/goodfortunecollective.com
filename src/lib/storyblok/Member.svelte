<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
	export let index: any;
	export let length: any;
</script>

<div use:storyblokEditable={blok} {...$$restProps}>
	<div
		class={'flex flex-row py-4 text-left align-center member' +
			(index == length - 1 ? ' last' : '')}
	>
		<div class="w-2/3 text-xl member-title">
			{blok.title}
		</div>
		<div class="w-1/3 text-sm font-bold tracking-widest uppercase member-position">
			{blok.position}
		</div>
		{#if blok.thumbnail.filename}
			<figure class="absolute hidden w-auto md:block member-image">
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
