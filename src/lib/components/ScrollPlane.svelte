<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { base } from '$app/paths';
	import { ScrollSmoother } from '$lib/gsap';
	import { useCurtains } from '$lib/utils/useCurtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';
	import { isPageHidden, isTransitioning } from '../stores';

	import type { Curtains, Plane as PlaneType } from '@types/curtainsjs';

	export let name: string;
	export let slug: string;
	export let content: any;

	let planeEl: HTMLElement;
	let plane: undefined | PlaneType;

	// only add planes when the page is hidden during transition
	let canCreatePlane,
		isTransition,
		isHidden: boolean = false;

	let curtains: undefined | Curtains;

	const clamp = (value = 0, min = 0, max = 0) => {
		return Math.max(min, Math.min(value, max));
	};

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

        uniform float uScrollVelocity;
        uniform float uEffectStrength;

        void main() {
            vec3 vertexPosition = aVertexPosition;

            // cool effect on scroll
            vertexPosition.x += sin((vertexPosition.y / 1.5 + 1.0) * 3.141592) * (uScrollVelocity * uEffectStrength);

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
        uniform float uOpacity;

        void main( void ) {
            // just display our texture
            vec4 color = texture2D(planeTexture, vTextureCoord);
            color.a *= uOpacity;
            gl_FragColor = color;
        }
    `;

	const params: PlaneParams = {
		vertexShader: vs,
		fragmentShader: fs,
		widthSegments: 10,
		heightSegments: 10,
		uniforms: {
			scrollVelocity: {
				name: 'uScrollVelocity',
				type: '1f',
				value: 0
			},
			effectStrength: {
				name: 'uEffectStrength',
				type: '1f',
				value: 0.0025
			},
			opacity: {
				name: 'uOpacity',
				type: '1f',
				value: 1
			}
		}
	};

	const createPlane = () => {
		if (curtains && canCreatePlane) {
			plane = new Plane(curtains, planeEl, params);

			console.log('add plane', plane);

			plane.onRender(() => {
				const scroll = ScrollSmoother.get();
				const velocity = clamp(scroll.getVelocity() * 0.01, -60, 60);
				plane.uniforms.scrollVelocity.value = velocity;

				plane.rotation.z = velocity * 0.00125;

				// scale plane and its texture
				plane.scale.y = 1 + Math.abs(velocity * 0.0025);
				plane.textures[0].scale.y = 1 + Math.abs(velocity * 0.005);
			});
		}
	};

	isTransitioning.subscribe((value: boolean) => {
		isTransition = value;
		// create plane if we're not coming from a page transition
		// (ie first load, project filters, etc)
		if (!value && !canCreatePlane) {
			canCreatePlane = true;
			createPlane();
		}
	});

	isPageHidden.subscribe(async (value: boolean) => {
		isHidden = value;
		if (value && isTransition && !canCreatePlane) {
			// coming from a page transition
			// wait for old planes to be removed first
			await tick();
			canCreatePlane = true;
			createPlane();
		}
	});

	useCurtains(
		(curtainsInstance) => {
			curtains = curtainsInstance;
			createPlane();
		},
		(curtainsInstance) => {
			// TODO not triggered after using work page filters!!
			// https://github.com/sveltejs/svelte/issues/5268 ?
			console.log('unmount');
			if (plane) {
				plane.remove();
				plane = null;
			}
		}
	);
</script>

<div class="plane-wrapper" data-id={slug}>
	<h2 class="plane-title">{name}</h2>
	<div class="uppercase plane-client">{content.client}</div>

	<div class="plane-inner">
		<div class="plane" bind:this={planeEl}>
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
		// margin: 10vh 0 10vh 25%;
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
		display: flex;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.plane img {
		display: none;

		@at-root.no-curtains & {
			display: block;
			min-width: 100%;
			min-height: 100%;
			object-fit: cover;
		}
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