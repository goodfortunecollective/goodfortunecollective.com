<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { base } from '$app/paths';
	import { Flex } from '$lib/components/layout';
	import { Heading } from '$lib/components/typography';

	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<svelte:head>
	<title>Careers</title>
	<meta name="description" content="Careers" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32 h-screen bg-gray-200">
	<div class="max-w-6xl mx-auto">
		<Flex class="items-end pt-16">
			<Heading as="h2" size="h1" class="md:w-1/2">Headline Statement</Heading>
			<p class="flex-1 text-xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac feugiat nisl, a
				cursus orci. Pellentesque sollicitudin feugiat ipsum, eget venenatis urna mollis ac.
			</p>
		</Flex>
	</div>
</section>

<section>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
</section>

<section class="pt-32 pb-32 bg-white">
	<div class="max-w-6xl mx-auto">
		<Flex class="pt-32 md:items-end">
			<Heading as="h2" size="h2" class="w-full md:w-1/2"
				>Current Openings Headline Statement</Heading
			>
			<ul class="w-full jobs-list md:w-1/2">
				{#each data.jobs as { name, slug }}
					<li class="jobs-list-item">
						<a
							class="flex items-center w-full py-3 jobs-list-item-link"
							href="{base}/careers/{slug}"
						>
							<span class="jobs-list-item-name">{name}</span>
							<span class="text-xs font-bold uppercase jobs-list-item-action">Apply now</span>
							<span class="arrow arrow-default" /><span
								class="flex items-center justify-center jobs-list-item-circle"
							>
								<span class="arrow arrow-hover" />
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</Flex>
	</div>
</section>

<style lang="scss">
	@import '../../vars.scss';
	.jobs-list-item-link {
		position: relative;
		overflow: hidden;

		&:before,
		&:after {
			position: absolute;
			right: 0;
			bottom: 0;
			height: 1px;
			content: '';
		}

		&:before {
			left: 0;
			background: $gray;
		}

		&:after {
			width: 100%;
			transform: translate(-100%, 0);
			background: $black;
			transition: 0.6s width ease-out, 0.6s transform ease-out;
		}

		&:hover {
			.jobs-list-item-action {
				transform: translate(0, 0);
				opacity: 1;
			}

			.jobs-list-item-circle {
				&:before {
					transform: scale(1) translate(0, 0);
				}
			}

			.arrow-default {
				transform: scale(0, 1) translate(45px, 0);
			}

			.arrow-hover {
				transform: translate(0, 0);
			}

			&:after {
				// animation: jobs-list-hover ease-out 0.8s;
				width: 20%;
				transform: translate(0, 0);
			}
		}
	}

	// @keyframes jobs-list-hover {
	// 	0% {
	// 		transform: translate(-100%, 0);
	// 		width: 100%;
	// 	}
	// 	100% {
	// 		transform: translate(0, 0);
	// 		width: 20%;
	// 	}
	// }

	.jobs-list-item-action {
		position: absolute;
		letter-spacing: 0.05em;
		right: 70px;
		transform: translate(-20%, 0);
		opacity: 0;
		transition: 0.4s transform ease-out, 0.4s opacity ease-out;
	}

	.jobs-list-item-circle {
		position: absolute;
		right: 0;
		width: 36px;
		height: 36px;
		border-radius: 36px;
		overflow: hidden;
		background: $grayUltraLight;
		overflow: hidden;
		z-index: 8;

		&:before {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 36px;
			transform: scale(1.2) translate(-100%, 0);
			background: $black;
			z-index: 9;
			content: '';
			transition: 0.4s transform ease-out, 0.4s opacity ease-out;
		}
	}

	.arrow {
		position: absolute;
		width: 50%;
		height: 1px;
		transition: 0.4s transform ease-out, 0.4s opacity ease-out;

		&:before,
		&:after {
			width: 4px;
			height: 1px;
			position: absolute;
			top: 0;
			right: 0;
			content: '';
		}

		&:before {
			transform: rotate(40deg);
			transform-origin: top right;
		}
		&:after {
			transform: rotate(-40deg);
			transform-origin: bottom right;
		}

		&.arrow-default {
			width: 38px;
			right: 15px;
			background: $grayLight;
			z-index: 15;
			transform-origin: 100% 50%;

			&:before,
			&:after {
				background: $grayLight;
			}
		}

		&.arrow-hover {
			width: 38%;
			background: $white;
			transform: translate(-100%, 0);
			z-index: 10;

			&:before,
			&:after {
				background: $white;
			}
		}
	}
</style>
