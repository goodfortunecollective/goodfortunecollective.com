<script lang="ts">
	import { onMount } from 'svelte';
	import { cva } from 'class-variance-authority';

	import { base } from '$app/paths';
	import { cls } from '$lib/styles';
	import { ScrollPlane } from '$lib/components';
	import { project_list_hover, isTransitioning } from '$lib/stores';

	export let name: string;
	export let slug: string;
	export let content: any;
	export let isMainItem: boolean;
	export let layout: 'left' | 'right' = 'left';
	export let theme: 'light' | 'dark' = 'light';

	const variants = cva('', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	function onEnter() {
		project_list_hover.set(name);
	}

	const onLeave = () => {
		// reset hover title only if we're not transitioning
		if (!$isTransitioning) {
			project_list_hover.set(null);
		}
	};

	// parallax
	let projectEl: HTMLElement;
	let ww: number;
	let wh: number;
	let initScroll: number = 0;
	let currentScroll: number = 0;
	let projectDOMRect: DOMRect;
	const parallaxStrength: number = 0.5;
	$: parallaxEffect = 0;

	const onResize = () => {
		ww = window.innerWidth;
		wh = window.innerHeight;
		initScroll = window.pageYOffset;

		if (projectEl) {
			projectDOMRect = projectEl.getBoundingClientRect();
		}

		applyParallax();
	};

	const applyParallax = () => {
		if (!projectDOMRect || !ww || !wh) return;

		const planeOffsetTop = projectDOMRect.top + projectDOMRect.height / 2 - wh * 0.5;
		// get a float value based on window height (0 means the plane is centered)
		const distanceToCenter = planeOffsetTop - (currentScroll - initScroll);

		// parallax strength is based on item relative width
		const itemParallaxStrength = ww / projectDOMRect.width - 1;

		// get parallax effect
		parallaxEffect = distanceToCenter * parallaxStrength * itemParallaxStrength;
	};

	const onScroll = (event: any) => {
		currentScroll = event.detail.scrollTop;
		applyParallax();
	};

	onMount(() => {
		const resizeObserver = new ResizeObserver(() => onResize());
		resizeObserver.observe(document.body);

		window.addEventListener('onLenisUpdate', onScroll);

		return () => {
			resizeObserver.disconnect();
			// this function is called when the component is destroyed
			window.removeEventListener('onLenisUpdate', onScroll);
		};
	});
</script>

<div
	bind:this={projectEl}
	class={cls(
		'ProjectListItem',
		isMainItem && 'ProjectListItem--is-main',
		`ProjectListItem--is-${layout}-layout`,
		$$props.class
	)}
	style="--parallax-effect: {parallaxEffect};"
>
	<a href="{base}/work/{slug}" data-id={slug}>
		<div
			class="ProjectListItem-thumb will-change-transform"
			on:mouseenter={onEnter}
			on:mouseleave={onLeave}
		>
			<ScrollPlane {slug} {content} {name} />
		</div>

		<div class="ProjectListItem-infos">
			<div class="text-sm uppercase ProjectListItem-category">
				{content.category && content.category[0]}
			</div>
			<div class="ProjectListItem-infos-inner">
				<h2
					class={cls(
						'ProjectListItem-title',
						isMainItem ? 'text-5xl' : 'text-3xl',
						variants({ theme: theme })
					)}
				>
					{name}
				</h2>
				<div class={cls('ProjectListItem-summary', variants({ theme: theme }))}>
					{content.summary}
				</div>
			</div>
			<div class="uppercase ProjectListItem-client">{content.client}</div>
		</div>
	</a>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.ProjectListItem {
		position: relative;
		overflow: visible;
		//margin: 200px 0;
		pointer-events: none;

		a {
			display: flex;
			flex-wrap: nowrap;
			width: 100%;
			flex-direction: column;
			align-items: flex-end;
			transform: translate3d(0, calc(var(--parallax-effect) * 1px), 0);
			pointer-events: auto;
		}

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
			width: 100%;
			//box-sizing: border-box;
			position: relative;
			padding: 1rem 8.3333%;

			@media (min-width: $media-md) {
				width: 65%;
				position: absolute;
				bottom: 0;
				transform: translate3d(0, 100%, 0);
				padding: 0;
				padding-top: 1rem;
			}

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
			transition: transform 0.3s ease-out, opacity 0.3s linear;

			@media (min-width: $media-md) {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
			}
		}

		@media (min-width: 768px) {
			&--is-main {
				a {
					flex-direction: row;
					align-items: flex-end;
					justify-content: space-between;
				}

				.ProjectListItem-thumb {
					width: 75%;
				}
				.ProjectListItem-infos {
					position: static;
					transform: none;
					width: calc(30% - 8.33vw);

					&-inner {
						padding: 2rem 0 0.5rem 0;
						margin: 2rem 0 0.5rem 0;
					}
				}
			}
		}

		&--is-left-layout {
			.ProjectListItem-infos {
				left: 0;
				right: 35%;
			}
		}

		&--is-right-layout {
			.ProjectListItem-infos {
				left: 0;
				right: 35%;

				@media (min-width: $media-md) {
					right: 0;
					left: 35%;
				}
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
