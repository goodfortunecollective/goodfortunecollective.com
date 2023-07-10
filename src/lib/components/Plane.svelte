<script lang="ts">
	import { base } from '$app/paths';

	export let name: string;
	export let slug: string;
	export let content: any;
</script>

<div class="plane-wrapper" data-id={slug}>
	<h2 class="plane-title">{name}</h2>
	<div class="uppercase plane-client">{content.client}</div>

	<div class="plane-inner">
		<div class="plane" data-plane>
			<a href="{base}/work/{slug}">
				<img
					src={content.thumbnail
						? content.thumbnail.filename.replace('//a-us.storyblok.com', '//a2-us.storyblok.com')
						: 'https://source.unsplash.com/random/?Motion&1'}
					crossorigin=""
					data-sampler="planeTexture"
					alt={name}
				/></a
			>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.plane-wrapper {
		position: relative;
		width: 75%;
		height: 60vh;
		margin: 10vh 25% 10vh 0;
	}

	.project {
		display: none;
		&.active {
			display: block;
		}
	}

	.plane-wrapper:nth-child(even) {
		margin: 10vh 0 10vh 25%;
	}

	.plane-wrapper:first-child {
		margin-top: 5vh;
	}

	.plane-wrapper:last-child {
		margin-bottom: 20vh;
	}

	.plane-title {
		position: absolute;
		top: 100%;
		left: 0%;
		font-size: 2em;
		font-weight: 700;
		display: inline-block;
		padding: 0.125em 0.25em;
	}

	.plane-client {
		color: #a7a89a;
	}

	.plane-categories {
		color: #a7a89a;
	}

	.plane {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.plane a {
		display: block;
		width: 100%;
		height: 100%;
	}

	.plane img {
		display: none;
	}

	@media screen and (max-width: 720px) {
		.plane-wrapper {
			height: 75vh;
			margin: 7.5vh auto;
		}

		.plane-wrapper:nth-child(even) {
			margin: 7.5vh auto;
		}

		.plane-wrapper:last-child {
			margin-bottom: 12.5vh;
		}
	}
</style>
