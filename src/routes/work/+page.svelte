<script lang="ts">
	import { base } from '$app/paths';
	import { ScrollSmoother } from '$lib/gsap';
	import { Curtains } from '$lib/vendors/curtainsjs/core/Curtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';
	import { onDestroy, onMount } from 'svelte';

	export let data;
	export let categoriesData = [];
	let curtains: any = null;
	let scroll: ScrollSmoother | null = null;

	function updateScroll(xOffset: any, yOffset: any) {
		// update our scroll manager values
		if (curtains) curtains.updateScrollValues(xOffset, yOffset);
	}

	//curtains.disableDrawing();

	function scrollonUpdate(event: any) {
		// @ts-ignore
		scroll = ScrollSmoother.get();
		console.log('event', event.detail);
		console.log('scroll', scroll);
		updateScroll(0, event.detail.offsetY);
		console.log('scroll', window.pageYOffset);
		// render scene
		if (curtains) curtains.needRender();
	}

	let categoriesOpened = false;

	function toggleCategories() {
		categoriesOpened = !categoriesOpened;
	}

	onMount(() => {
		// console.log(data.stories);

		// Get project counts by category
		let storiesLength = data.stories.length;

		let categories = data.categories.data.datasource_entries,
			categoriesLength = categories.length;

		for (let i = 0; i < categoriesLength; i++) {
			categoriesData[i] = {
				name: categories[i].name,
				slug: categories[i].value,
				count: 0
			};
		}

		for (let indexStory = 0; indexStory < storiesLength; indexStory++) {
			let categories = data.stories[indexStory].content.category;

			for (let indexCat = 0; indexCat < categories.length; indexCat++) {
				let category = categories[indexCat];
				var result = categoriesData.find((item) => item.slug === category);
				// console.log('category :' + category);
				// console.log(result);
				result.count++;
			}
		}

		// console.log(categoriesData);

		// we will keep track of all our planes in an array
		const planes: any = [];
		let scrollEffect = 0;

		// get our planes elements
		const planeElements = document.getElementsByClassName('plane');

		const useNativeScroll = false;

		if (!useNativeScroll) {
			window.addEventListener('smoothScrollUpdate', scrollonUpdate);
		}

		// set up our WebGL context and append the canvas to our wrapper
		curtains = new Curtains({
			container: 'canvas',
			watchScroll: useNativeScroll,
			pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
		});

		if (!useNativeScroll) {
			curtains.disableDrawing();
		}

		curtains
			.onRender(() => {
				//if (useNativeScroll) {
				// update our planes deformation
				// increase/decrease the effect
				if (useNativeScroll) {
					scrollEffect = curtains.lerp(scrollEffect, 0, 0.05);
				}
				//}
			})
			.onScroll(() => {
				// get scroll deltas to apply the effect on scroll
				const delta = curtains.getScrollDeltas();

				// invert value for the effect
				delta.y = -delta.y;

				// threshold
				if (delta.y > 60) {
					delta.y = 60;
				} else if (delta.y < -60) {
					delta.y = -60;
				}

				if (useNativeScroll && Math.abs(delta.y) > Math.abs(scrollEffect)) {
					scrollEffect = curtains.lerp(scrollEffect, delta.y, 0.5);
				} else {
					scrollEffect = curtains.lerp(scrollEffect, delta.y * 1.5, 0.5);
				}

				// manually update planes positions
				for (let i = 0; i < planes.length; i++) {
					// apply additional translation, scale and rotation
					//applyPlanesParallax(i);

					// update the plane deformation uniform as well
					planes[i].uniforms.scrollEffect.value = scrollEffect;
				}
			})
			.onError(() => {
				// we will add a class to the document body to display original images
				document.body.classList.add('no-curtains', 'planes-loaded');
			})
			.onContextLost(() => {
				// on context lost, try to restore the context
				curtains.restoreContext();
			});

		const vs = `
        precision mediump float;

        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        uniform mat4 planeTextureMatrix;

        // custom variables
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform float uScrollEffect;

        void main() {
            vec3 vertexPosition = aVertexPosition;

            // cool effect on scroll
            vertexPosition.x += sin((vertexPosition.y / 1.5 + 1.0) * 3.141592) * (sin(uScrollEffect / 2000.0));

            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

            // varyings
            vVertexPosition = vertexPosition;
            vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        }
    `;

		const fs = `
        precision mediump float;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform sampler2D planeTexture;

        void main( void ) {
            // just display our texture
            gl_FragColor = texture2D(planeTexture, vTextureCoord);
        }
    `;

		const params = {
			vertexShader: vs,
			fragmentShader: fs,
			widthSegments: 10,
			heightSegments: 10,
			uniforms: {
				scrollEffect: {
					name: 'uScrollEffect',
					type: '1f',
					value: 0
				}
			}
		};

		// add our planes and handle them
		for (let i = 0; i < planeElements.length; i++) {
			const plane = new Plane(curtains, planeElements[i], params);

			planes.push(plane);

			handlePlanes(i);
		}

		// handle all the planes
		function handlePlanes(index) {
			const plane = planes[index];

			// check if our plane is defined and use it
			plane
				.onReady(() => {
					// apply parallax on load
					applyPlanesParallax(index);

					// once everything is ready, display everything
					if (index === planes.length - 1) {
						document.body.classList.add('planes-loaded');
					}
				})
				.onAfterResize(() => {
					// apply new parallax values after resize
					applyPlanesParallax(index);
				})
				.onRender(() => {
					// new way: we just have to change the rotation and scale properties directly!
					// apply the rotation
					plane.rotation.z = Math.abs(scrollEffect) / 750;

					// scale plane and its texture
					plane.scale.y = 1 + Math.abs(scrollEffect) / 300;
					plane.textures[0].scale.y = 1 + Math.abs(scrollEffect) / 150;
				})
				.onReEnterView(() => {
					// plane is drawn again
					// planeDrawn++;
					// update our number of planes drawn debug value
					// debugElement.innerText = planeDrawn;
				})
				.onLeaveView(() => {
					// plane is not drawn anymore
					// planeDrawn--;
					// update our number of planes drawn debug value
					// debugElement.innerText = planeDrawn;
				});
		}

		function applyPlanesParallax(index) {
			return;
			// calculate the parallax effect

			// get our window size
			const sceneBoundingRect = curtains.getBoundingRect();
			// get our plane center coordinate
			const planeBoundingRect = planes[index].getBoundingRect();
			const planeOffsetTop = planeBoundingRect.top + planeBoundingRect.height / 2;
			// get a float value based on window height (0 means the plane is centered)
			const parallaxEffect =
				(planeOffsetTop - sceneBoundingRect.height / 2) / sceneBoundingRect.height;

			// apply the parallax effect
			planes[index].relativeTranslation.y = (parallaxEffect * sceneBoundingRect.height) / 4;

			/*
        // old way using setRelativeTranslation
        planes[index].setRelativeTranslation(new Vec3(0, parallaxEffect * (sceneBoundingRect.height / 4)));
         */
		}

		return () => {
			// this function is called when the component is destroyed
			if (!useNativeScroll) {
				window.removeEventListener('smoothScrollUpdate', scrollonUpdate);
			}
		};
	});

	onDestroy(() => {
		if (curtains) {
			curtains.dispose();
			curtains = null;
		}
	});
</script>

<svelte:head>
	<title>Work</title>
	<meta name="description" content="Work" />
</svelte:head>

<section class="pt-[var(--header-height)] pb-32">
	<div
		class={'categories-toggle' + (categoriesOpened ? ' opened' : '')}
		id="categories-toggle"
		on:click={toggleCategories}
	/>

	<div
		class={'flex flex-col mt-12 pr-6 text-sm font-bold uppercase categories' +
			(categoriesOpened ? ' opened' : '')}
		id="categories"
	>
		<a class="mb-2 category all active" href="#all" data-category="all"
			>All projects
			{#if data.stories}
				<sup class="text-xs font-normal category-number">
					{#if data.stories.length < 10}0{/if}{data.stories.length}</sup
				>
			{/if}
		</a>
		{#each data.categories.data.datasource_entries as category, i}
			{#if categoriesData[i] && categoriesData[i].count > 0}
				<a class="mb-2 category" href="#{category.value}" data-category={category.value}>
					{category.name}
					{#if categoriesData[i]}
						<sup class="text-xs font-normal category-number"
							>{#if categoriesData[i].count < 10}0{/if}{categoriesData[i].count}</sup
						>
					{/if}
				</a>
			{/if}
		{/each}
	</div>

	<div id="planes" class="max-w-6xl mx-auto">
		{#each data.stories as { name, slug, content }}
			<div class="plane-wrapper">
				<h2 class="plane-title">{name}</h2>
				<div class="uppercase plane-client">{content.client}</div>
				{#if content.category}
					<div class="uppercase plane-categories">
						{#each content.category as category}
							{category}
						{/each}
					</div>
				{/if}
				<div class="plane-inner">
					<div class="plane">
						<a href="{base}/work/{slug}">
							<!-- src={content.thumbnail
									? content.thumbnail.filename
									: 'https://source.unsplash.com/random/?Motion&1'} -->
							<img
								src="https://source.unsplash.com/random/?Motion&1"
								crossorigin=""
								data-sampler="planeTexture"
								alt={name}
							/></a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	@import '../../vars.scss';

	#categories-toggle {
		position: relative;
		width: 39px;
		height: 39px;
		border-radius: 100%;
		background: #e0e6e7;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.5s background ease-out;
		cursor: pointer;
		z-index: 20;

		@media (min-width: $media-md) {
			position: absolute;
			right: 0;
		}

		&:before,
		&:after {
			position: absolute;
			width: 9px;
			height: 1px;
			background: #596669;
			content: '';
			transition: 0.5s background ease-out, 0.5s opacity ease-out, 0.4s transform ease-out;
		}

		&:after {
			transform: rotate(90deg);
		}

		&.opened {
			background: $black;

			&:before,
			&:after {
				background: $white;
			}

			&:after {
				opacity: 0;
				transform: rotate(45deg);
			}
		}
	}

	#categories {
		position: relative;
		letter-spacing: 0.05em;
		z-index: 15;
		overflow: hidden;
		padding-left: 40px;
		height: 0;
		transition: 0.5s height ease-out;
		text-align: right;

		&.opened {
			height: auto;
		}

		&:after {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 1px;
			background: #a3b2b6;
			content: '';
		}

		@media (min-width: $media-md) {
			position: absolute;
			right: 0;
			margin-right: 20px;
		}
	}

	.category {
		position: relative;
		color: #a7a89a;
		transition: 0.4s color ease-out, 0.4s transform ease-out;

		&:after {
			position: absolute;
			right: -40px;
			width: 4px;
			height: 4px;
			border-radius: 100%;
			top: 50%;
			margin-top: -2px;
			background: $black;
			opacity: 0;
			content: '';
			transition: 0.4s opacity ease-out, 0.4s transform ease-out;
		}

		&.active {
			color: #596669;
			transform: translate(-40px, 0);
			cursor: default;

			&:after {
				opacity: 1;
			}
		}
		@media (min-width: $media-md) {
			&:hover {
				color: #596669;
				transform: translate(-40px, 0);
				&:after {
					opacity: 1;
				}
			}
		}
	}

	.category-number {
		margin-top: -2px;
	}

	.planes-loaded #planes {
		opacity: 1;
	}

	.plane-wrapper {
		position: relative;

		width: 75%;
		height: 60vh;
		margin: 10vh 25% 10vh 0;
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
