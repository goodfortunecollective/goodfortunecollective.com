<script lang="ts">
	import { clamp } from '../utils/maths';
	import { ScrollSmoother } from '$lib/gsap';
	import { useCurtains } from '$lib/utils/useCurtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';
	import gsap from '$lib/gsap';
	import { onDestroy } from 'svelte';

	import { isPageHidden, isTransitioning, project_list_hover } from '$lib/stores';

	import type { Curtains, Plane as PlaneType, PlaneParams } from '@types/curtainsjs';

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
        		vec2 uv = vTextureCoord;

            vec4 color = texture2D(planeTexture, uv);
            vec4 rColor = texture2D(planeTexture, uv + vec2(0.0, uScrollVelocity * uEffectStrength) * 0.15);
            vec4 bColor = texture2D(planeTexture, uv - vec2(0.0, uScrollVelocity * uEffectStrength) * 0.15);

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
		if (curtains && canCreatePlane && planeEl) {
			console.log('create plane', name, planeEl)
			params.renderOrder = curtains.planes.length;

			plane = new Plane(curtains, planeEl, params);

			plane.onRender(() => {
				const scroll = ScrollSmoother.get();
				const velocity = clamp(scroll.getVelocity() * 0.01, -60, 60);
				plane.uniforms.scrollVelocity.value = velocity;

				// not super optimized but since we're translating its parent container it's mandatory
				plane.updatePosition()
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

	// isPageHidden.subscribe((value: boolean) => {
	// 	isHidden = value;
	// 	if (value && isTransition && !canCreatePlane) {
	// 		// coming from a page transition
	// 		// wait a couple ticks for old planes to be removed first
	// 		canCreatePlane = true;
	// 		createPlane();
	// 		setTimeout(() => {
	// 			createPlane();
	// 		}, 32);
	// 	}
	// });


	useCurtains(
		(curtainsInstance) => {
			curtains = curtainsInstance;
			createPlane();
		},
		(curtainsInstance) => {
			// TODO not triggered after using work page filters!!
			// https://github.com/sveltejs/svelte/issues/5268 ?
			if (plane) {
				console.log('plane removed', plane.index, name);
				plane.remove();
				plane = null;
				curtainsInstance.resize();
			}
		}
	);


	// hover
	let hoverTween = null;
	project_list_hover.subscribe(value => {
		if(!plane) return

		hoverTween?.kill()

		const texture = plane.textures[0]

		const hoverTransition = {
			textureScale: texture?.scale.x,
		}

		if(value === name) {
			hoverTween = gsap.to(hoverTransition, {
				textureScale: 1.15,
				duration: 0.5,
				ease: 'power2.inOut',
				onUpdate: () => {
					texture.scale.x = hoverTransition.textureScale;
					texture.scale.y = hoverTransition.textureScale;
				}
			})
		}
		else if(texture && texture.scale.x) {
			hoverTween = gsap.to(hoverTransition, {
				textureScale: 1,
				duration: 0.5,
				ease: 'power2.inOut',
				onUpdate: () => {
					texture.scale.x = hoverTransition.textureScale;
					texture.scale.y = hoverTransition.textureScale;
				}
			})
		}
	})

	onDestroy(() => {
		hoverTween?.kill()
	})
</script>

<div class="ScrollPlane" bind:this={planeEl}>
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
