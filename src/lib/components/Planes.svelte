<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { ScrollSmoother } from '$lib/gsap';
	import { Curtains } from '$lib/vendors/curtainsjs/core/Curtains';
	import { Plane } from '$lib/vendors/curtainsjs/core/Plane';

	let curtains: any = null;
	let scroll: ScrollSmoother | null = null;
	let container: any = null;

	const planes: any = [];
	let scrollEffect = 0;

	function updateScroll(xOffset: any, yOffset: any) {
		// update our scroll manager values
		if (curtains) curtains.updateScrollValues(xOffset, yOffset);
	}

	function scrollonUpdate(event: any) {
		// @ts-ignore
		scroll = ScrollSmoother.get();
		// console.log('event', event.detail);
		// console.log('scroll', scroll);
		updateScroll(0, event.detail.offsetY);
		// console.log('scroll', window.pageYOffset);
		// render scene
		if (curtains) curtains.needRender();
	}

	onMount(async () => {
		initCurtains();

		return () => {
			// this function is called when the component is destroyed
			if (!useNativeScroll) {
				window.removeEventListener('smoothScrollUpdate', scrollonUpdate);
			}
		};
	});

	function initCurtains() {
		// console.log('Init curtains');
		// we will keep track of all our planes in an array

		// get our planes elements
		const planeElements = container.querySelectorAll('[data-plane]');
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

		// add our planes and handle them-
		for (let i = 0; i < planeElements.length; i++) {
			const plane = new Plane(curtains, planeElements[i], params);
			planes.push(plane);

			handlePlanes(i);
		}
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

	onDestroy(() => {
		if (curtains) {
			curtains.dispose();
			curtains = null;
		}
	});
</script>

<div bind:this={container} class="max-w-6xl mx-auto">
	<slot />
</div>

<style lang="scss">
	@import '../../vars.scss';

	.planes-loaded #planes {
		opacity: 1;
	}
</style>
