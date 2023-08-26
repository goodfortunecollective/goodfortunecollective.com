<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { base } from '$app/paths';
	import { cls } from '$lib/styles';
	import { clamp } from '../utils/maths';
	import { ScrollSmoother } from '$lib/gsap';
	import { useCurtains } from '$lib/utils/useCurtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';
	import { isPageHidden, isTransitioning } from '../stores';

	import type { Curtains, Plane as PlaneType, PlaneParams } from '@types/curtainsjs';

	export let name: string;
	export let slug: string;
	export let content: any;
	export let hover: boolean = false;

	let planeEl: HTMLElement;
	let plane: undefined | PlaneType;

	// only add planes when the page is hidden during transition
	let canCreatePlane,
		isTransition,
		isHidden: boolean = false;

	let curtains: undefined | Curtains;

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
            vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (uScrollVelocity * uEffectStrength);

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
        uniform float uScrollVelocity;
        uniform float uEffectStrength;

        void main( void ) {
            vec4 color = texture2D(planeTexture, vTextureCoord);
            vec4 rColor = texture2D(planeTexture, vTextureCoord + vec2(0.0, uScrollVelocity * uEffectStrength) * 0.15);
            vec4 bColor = texture2D(planeTexture, vTextureCoord - vec2(0.0, uScrollVelocity * uEffectStrength) * 0.15);

            color.a *= uOpacity;

            gl_FragColor = vec4(rColor.r, color.g, bColor.b, color.a);
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
				value: 0.005
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
			params.renderOrder = curtains.planes.length;

			plane = new Plane(curtains, planeEl, params);

			console.log('add plane', plane);

			plane.onRender(() => {
				const scroll = ScrollSmoother.get();
				const velocity = clamp(scroll.getVelocity() * 0.01, -60, 60);
				plane.uniforms.scrollVelocity.value = velocity;

				//plane.rotation.z = velocity * 0.00125;

				// scale plane and its texture
				//plane.scale.y = 1 + Math.abs(velocity * 0.0025);
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

	isPageHidden.subscribe((value: boolean) => {
		isHidden = value;
		if (value && isTransition && !canCreatePlane) {
			// coming from a page transition
			// wait a couple ticks for old planes to be removed first
			canCreatePlane = true;
			setTimeout(() => {
				createPlane();
			}, 32);
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
			if (plane) {
				console.log('plane removed', plane.renderOrder, curtainsInstance);
				plane.remove();
				plane = null;
				curtainsInstance.resize();
			}
		}
	);
</script>

<div>
	<img
		src={content.thumbnail
			? content.thumbnail.filename.replace('//a-us.storyblok.com', '//a2-us.storyblok.com')
			: 'https://source.unsplash.com/random/?Motion&1'}
		crossorigin=""
		data-sampler="planeTexture"
		alt={name}
	/>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.ScrollPlane {
		display: flex;
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}

	.ScrollPlane img {
		display: none;

		@at-root.no-curtains & {
			display: block;
			min-width: 100%;
			min-height: 100%;
			object-fit: cover;
		}
	}
</style>
