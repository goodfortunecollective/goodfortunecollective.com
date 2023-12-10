<script lang="ts">
	import { onDestroy } from 'svelte';

	import { useCurtains } from '$lib/utils/useCurtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';
	import { Vec2 } from '$lib/vendors/curtainsjs/math/Vec2';
	import type {
		Curtains,
		Plane as PlaneType,
		PlaneParams,
		Vec2 as Vec2Type
	} from '@types/curtainsjs';
	import { isPageHidden, isTransitioning } from '$lib/stores';
	import { cls } from '$lib/styles';
	import gsap from '$lib/gsap';

	export let content: any;
	export let isTitleHovered: boolean = false;

	const mousePosition = {
		x: 0 as number,
		y: 0 as number
	};

	const planeDeformation: Vec2Type = new Vec2();

	const onMouseMove = (event: MouseEvent) => {
		mousePosition.x = event.clientX;
		mousePosition.y = event.clientY;
	};

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

        uniform vec2 uDeformation;
        uniform float uEffectStrength;

        void main() {
            vec3 vertexPosition = aVertexPosition;

            // cool effect on mouse move
            vertexPosition.x += sin(((vertexPosition.y + 1.0) / 2.0) * 3.141592) * (uDeformation.x * uEffectStrength);
            vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (-uDeformation.y * uEffectStrength);

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
		transparent: true,
		watchScroll: false,
		uniforms: {
			deformation: {
				name: 'uDeformation',
				type: '2f',
				value: planeDeformation
			},
			effectStrength: {
				name: 'uEffectStrength',
				type: '1f',
				value: 0.01
			},
			opacity: {
				name: 'uOpacity',
				type: '1f',
				value: 0
			}
		}
	};

	const createPlane = () => {
		if (curtains && canCreatePlane) {
			plane = new Plane(curtains, planeEl, params);

			plane.onRender(() => {
				const planeBBox = plane.getBoundingRect();

				const translation = {
					x: mousePosition.x - (planeBBox.left + planeBBox.width * 0.5) / curtains.pixelRatio,
					y: mousePosition.y - (planeBBox.top + planeBBox.height * 0.5) / curtains.pixelRatio
				};

				const lerpedTranslation = {
					x: curtains.lerp(plane.relativeTranslation.x, translation.x, 0.1),
					y: curtains.lerp(plane.relativeTranslation.y, translation.y, 0.1)
				};

				(plane.uniforms.deformation.value as Vec2Type).set(
					lerpedTranslation.x - plane.relativeTranslation.x,
					lerpedTranslation.y - plane.relativeTranslation.y
				);

				plane.relativeTranslation.x = lerpedTranslation.x;
				plane.relativeTranslation.y = lerpedTranslation.y;
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

	// hover
	let hoverTween = null;

	const onTitleHover = (isHovered = false) => {
		if (!plane) return;

		hoverTween?.kill();

		const hoverTransition = {
			opacity: plane.uniforms.opacity.value
		};

		if (isHovered) {
			hoverTween = gsap.to(hoverTransition, {
				opacity: 1,
				duration: 0.5,
				onUpdate: () => {
					plane.uniforms.opacity.value = hoverTransition.opacity;
				}
			});
		} else {
			hoverTween = gsap.to(hoverTransition, {
				opacity: 0,
				duration: 0.5,
				onUpdate: () => {
					plane.uniforms.opacity.value = hoverTransition.opacity;
				}
			});
		}
	};

	onDestroy(() => {
		hoverTween?.kill();
	});

	// now make it reactive
	$: onTitleHover(isTitleHovered);

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

<svelte:window on:mousemove={onMouseMove} />

<div class="HoverPlane" bind:this={planeEl}>
	<img
		src={content.thumbnail
			? content.thumbnail.filename.replace('//a-us.storyblok.com', '//a2-us.storyblok.com')
			: 'https://source.unsplash.com/random/?Motion&1'}
		crossorigin=""
		data-sampler="planeTexture"
		alt={content.title}
		class={cls('hidden')}
	/>
</div>

<style lang="scss">
	@import '../../vars.scss';

	.HoverPlane {
		display: flex;
		overflow: hidden;
		width: 100%;
		height: 33%;
	}
</style>
