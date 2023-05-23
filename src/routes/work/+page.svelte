<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Curtains } from '$lib/curtainsjs/core/Curtains';
	import { Plane } from '$lib/curtainsjs/core/Plane';

	import gsap from 'gsap';

	import ScrollTrigger from '$lib/gsap/ScrollTrigger';
	import ScrollSmoother from '$lib/gsap/ScrollSmoother';

	let curtains: any = null;

	onMount(() => {
		gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

		// we will keep track of all our planes in an array
		const planes: any = [];
		let scrollEffect = 0;

		// get our planes elements
		const planeElements = document.getElementsByClassName('plane');

		// set up our WebGL context and append the canvas to our wrapper
		curtains = new Curtains({
			container: 'canvas',
			pixelRatio: Math.min(1.5, window.devicePixelRatio) // limit pixel ratio for performance
		});

		// @ts-ignore
		ScrollSmoother.create({
			smooth: 1.5,
			effects: true
			//onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
			// onStop: () => skewSetter(0)
		});

		curtains
			.onRender(() => {
				scrollEffect = curtains.lerp(scrollEffect, 0, 0.05);
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

				if (Math.abs(delta.y) > Math.abs(scrollEffect)) {
					scrollEffect = curtains.lerp(scrollEffect, delta.y, 0.5);
				} else {
					scrollEffect = curtains.lerp(scrollEffect, delta.y * 1.5, 0.5);
				}

				// manually update planes positions
				for (let i = 0; i < planes.length; i++) {
					// apply additional translation, scale and rotation
					applyPlanesParallax(i);

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

		// keep track of the number of plane we're currently drawing
		const debugElement = document.getElementById('debug-value');
		// we need to fill the counter with all our planes
		let planeDrawn = planeElements.length;

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

		const params: any = {
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
		function handlePlanes(index: number) {
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

					/*
            // old way: using setRotation and setScale
            plane.setRotation(new Vec3(0, 0, scrollEffect / 750));
            plane.setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 300));
            plane.textures[0].setScale(new Vec2(1, 1 + Math.abs(scrollEffect) / 150));
            */
				})
				.onReEnterView(() => {
					// plane is drawn again
					planeDrawn++;
					// update our number of planes drawn debug value
					// if (debugElement) debugElement.innerText = planeDrawn;
				})
				.onLeaveView(() => {
					// plane is not drawn anymore
					planeDrawn--;
					// update our number of planes drawn debug value
					// if (debugElement) debugElement.innerText = planeDrawn;
				});
		}

		function applyPlanesParallax(index: number) {
			// calculate the parallax effect

			// get our window size
			const sceneBoundingRect = curtains.getBoundingRect();

			if (sceneBoundingRect) {
				// get our plane center coordinate
				const planeBoundingRect = planes[index].getBoundingRect();
				const planeOffsetTop = planeBoundingRect.top + planeBoundingRect.height / 2;
				// get a float value based on window height (0 means the plane is centered)
				const parallaxEffect =
					(planeOffsetTop - sceneBoundingRect.height / 2) / sceneBoundingRect.height;

				// apply the parallax effect
				planes[index].relativeTranslation.y = (parallaxEffect * sceneBoundingRect.height) / 4;
			}
		}
	});

	onDestroy(() => {
		if (curtains) curtains.dispose();
	});
</script>

<svelte:head>
	<title>Work</title>
	<meta name="description" content="Work" />
</svelte:head>

<div class="relative" data-barba="container" data-barba-namespace="work">
	<h1>Work</h1>
	<div id="page-content">
		<div id="content">
			<section class="overflow-hidden opacity-0" id="planes">
				<div class="plane-wrapper">
					<span class="plane-title">Title 1</span>
					<div class="plane-inner">
						<div class="plane">
							<img
								src="https://source.unsplash.com/random/?Motion&1"
								alt=""
								crossorigin=""
								data-sampler="planeTexture"
							/>
						</div>
					</div>
				</div>
				<div class="plane-wrapper">
					<span class="plane-title">Title 2</span>
					<div class="plane-inner">
						<div class="plane">
							<img
								src="https://source.unsplash.com/random/?Motion&2"
								alt=""
								crossorigin=""
								data-sampler="planeTexture"
							/>
						</div>
					</div>
				</div>
				<div class="plane-wrapper">
					<span class="plane-title">Title 3</span>
					<div class="plane-inner">
						<div class="plane">
							<img
								src="https://source.unsplash.com/random/?Motion&3"
								alt=""
								crossorigin=""
								data-sampler="planeTexture"
							/>
						</div>
					</div>
				</div>
				<div class="plane-wrapper">
					<span class="plane-title">Title 4</span>
					<div class="plane-inner">
						<div class="plane">
							<img
								src="https://source.unsplash.com/random/?Motion&4"
								alt=""
								crossorigin=""
								data-sampler="planeTexture"
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	#page-content {
		position: relative;
		z-index: 15;
	}

	#content {
		max-width: 1440px;
		margin: 0 auto;
		padding: 40px 0 0 0;
	}
	.plane {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.plane img {
		display: none;
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
		color: red;
		position: absolute;
		top: 25%;
		left: 25%;
		font-size: 2em;
		font-weight: 700;
		background: #ee6557;
		display: inline-block;
		padding: 0.125em 0.25em;
	}

	/*** handling errors ***/

	.no-curtains .plane-title {
		z-index: 1;
	}

	.no-curtains .plane {
		display: flex;
		overflow: hidden;
	}

	.no-curtains .plane img {
		display: block;
		min-width: 100%;
		min-height: 100%;
		object-fit: cover;
	}
</style>
