<script lang="ts">
	import { base } from '$app/paths';
	import { cls } from '$lib/styles';
	import { ScrollPlane } from '$lib/components';

	import { project_list_hover } from '$lib/stores';

	export let name: string;
	export let slug: string;
	export let content: any;
	export let isMainItem: boolean;
	export let layout: 'left' | 'right' = 'left';
	export let hover: boolean = false;
	export let useCurtainsPlanes: boolean = true;

	let list_hover: string[] = [];

	project_list_hover.subscribe((value) => {
		list_hover = value;
	});

	function onEnter() {
		$project_list_hover = [name, ...$project_list_hover];
	}

	function onLeave() {
		$project_list_hover = $project_list_hover.filter((item) => item !== name);
	}
</script>

<a
	href="{base}/work/{slug}"
	class={cls(
		'ProjectListItem',
		isMainItem && 'ProjectListItem--is-main',
		`ProjectListItem--is-${layout}-layout`,
		$$props.class
	)}
	data-id={slug}
>
	<div class="ProjectListItem-thumb" on:mouseenter={onEnter} on:mouseleave={onLeave}>
		{#if useCurtainsPlanes}
			<ScrollPlane
				{slug}
				{content}
				{name}
				hoverOthers={list_hover.length > 0 && !list_hover.includes(name)}
			/>
		{:else}
			<div class="ProjectListItem-thumb-image">
				<img
					src={content.thumbnail
						? content.thumbnail.filename.replace('//a-us.storyblok.com', '//a2-us.storyblok.com')
						: 'https://source.unsplash.com/random/?Motion&1'}
					crossorigin=""
					data-sampler="planeTexture"
					alt={name}
				/>
			</div>
		{/if}
	</div>

	<div class="ProjectListItem-infos">
		<div class="ProjectListItem-category uppercase text-sm">
			{content.category && content.category[0]}
		</div>
		<div class="ProjectListItem-infos-inner">
			<h2 class={cls('ProjectListItem-title', isMainItem ? 'text-5xl' : 'text-3xl')}>
				{name}
			</h2>
			<div class="ProjectListItem-summary">{content.summary}</div>
		</div>
		<div class="uppercase ProjectListItem-client">{content.client}</div>
	</div>
</a>

<style lang="scss">
	@import '../../vars.scss';

	.ProjectListItem {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		flex-direction: column;
		align-items: flex-end;
		position: relative;
		overflow: visible;
		//margin: 200px 0;

		&-thumb {
			width: 100%;
			position: relative;

			&-image {
				display: flex;
				aspect-ratio: 16 / 9;
				overflow: hidden;

				img {
					display: block;
					min-width: 100%;
					min-height: 100%;
					object-fit: cover;
				}
			}
		}

		&-infos {
			width: 50%;
			//box-sizing: border-box;
			position: absolute;
			bottom: 0;
			padding-top: 1rem;
			transform: translate3d(0, 100%, 0);

			&-inner {
				position: relative;
				overflow: hidden;
				padding: 0.5rem 0;
				margin: 0.5rem 0;
			}
		}

		&-title {
			transition: transform 0.3s ease-out, opacity 0.3s linear;
		}

		&-category,
		&-client {
			color: #a7a89a;
		}

		&-summary {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			transition: transform 0.3s ease-out, opacity 0.3s linear;
		}

		&--is-main {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;

			.ProjectListItem-thumb {
				width: 75%;
			}

			.ProjectListItem-infos {
				position: static;
				transform: none;
				width: calc(25% - 8.33vw);

				&-inner {
					padding: 2rem 0 0.5rem 0;
					margin: 2rem 0 0.5rem 0;
				}
			}
		}

		&--is-left-layout {
			.ProjectListItem-infos {
				left: 0;
				right: 50%;
			}
		}

		&--is-right-layout {
			.ProjectListItem-infos {
				right: 0;
				left: 50%;
			}
		}

		&:hover {
			.ProjectListItem-thumb-hover-title-inner {
				transform: translate3d(0, 0, 0);
				opacity: 1;
			}

			.ProjectListItem-title {
				transform: translate3d(0, -100%, 0);
				opacity: 0;
			}

			.ProjectListItem-summary {
				transform: translate3d(0, 0, 0);
				opacity: 1;
			}
		}
	}
</style>
