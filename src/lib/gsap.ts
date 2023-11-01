import { browser } from '$app/environment';

import { CustomEase } from '$lib/vendors/gsap/CustomEase';
import { Draggable } from '$lib/vendors/gsap/Draggable.js';
import { Flip } from '$lib/vendors/gsap/Flip.js';
import { InertiaPlugin } from '$lib/vendors/gsap/InertiaPlugin.js';
import { MotionPathPlugin } from '$lib/vendors/gsap/MotionPathPlugin.js';
import { ScrollSmoother } from '$lib/vendors/gsap/ScrollSmoother.js';
import { ScrollToPlugin } from '$lib/vendors/gsap/ScrollToPlugin';
import { ScrollTrigger } from '$lib/vendors/gsap/ScrollTrigger.js';
import { SplitText } from '$lib/vendors/gsap/SplitText.js';

import gsap from 'gsap';

if (browser) {
	gsap.registerPlugin(
		CustomEase,
		Draggable,
		Flip,
		InertiaPlugin,
		MotionPathPlugin,
		ScrollSmoother,
		ScrollToPlugin,
		ScrollTrigger,
		SplitText
	);
}

CustomEase.create("css-ease", "M0,0 C0.25,0.1 0.25,1 1,1");
CustomEase.create("css-ease.in", "M0,0 C0.42,0 1,1 1,1");
CustomEase.create("css-ease.out", "M0,0 C0,0 0.58,1 1,1");
CustomEase.create("css-ease.in-out", "M0,0 C0.42,0 0.58,1 1,1");


export { CustomEase, Draggable, Flip,InertiaPlugin, MotionPathPlugin, ScrollSmoother, ScrollToPlugin, ScrollTrigger, SplitText };
export default gsap;
