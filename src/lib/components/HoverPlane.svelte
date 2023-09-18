<script lang="ts">
	import { useCurtains } from '$lib/utils/useCurtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';
	import type { Curtains, Plane as PlaneType, PlaneParams } from '@types/curtainsjs';
	import { isPageHidden, isTransitioning } from '$lib/stores';

	export let content: any;

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
			plane = new Plane(curtains, planeEl, params);

			plane.onRender(() => {

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
				//curtainsInstance.resize();
			}
		}
	);
</script>

<div class="HoverPlane" bind:this={planeEl}>
	<img
		src={content.thumbnail
			? content.thumbnail.filename.replace('//a-us.storyblok.com', '//a2-us.storyblok.com')
			: 'https://source.unsplash.com/random/?Motion&1'}
		crossorigin=""
		data-sampler="planeTexture"
		alt={content.title}
	/>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.HoverPlane {
		display: flex;
		overflow: hidden;
		width: 100%;
		height: 100%;

		img {
			display: none;

			@at-root.no-curtains & {
				display: block;
				min-width: 100%;
				min-height: 100%;
				object-fit: cover;
			}
		}
	}
</style>
