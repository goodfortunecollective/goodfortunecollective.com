import { browser } from '$app/environment';

import { ScrollTrigger } from '$lib/vendors/gsap/ScrollTrigger.js';
import { MotionPathPlugin } from '$lib/vendors/gsap/MotionPathPlugin.js';
import { ScrollSmoother } from '$lib/vendors/gsap/ScrollSmoother.js';
import { SplitText } from '$lib/vendors/gsap/SplitText.js';
import { Draggable } from '$lib/vendors/gsap/Draggable.js';
import { InertiaPlugin } from '$lib/vendors/gsap/InertiaPlugin.js';

import gsap from 'gsap';

if (browser) {
	gsap.registerPlugin(
		ScrollSmoother,
		ScrollTrigger,
		MotionPathPlugin,
		SplitText,
		Draggable,
		InertiaPlugin
	);
}

export { ScrollSmoother, ScrollTrigger, MotionPathPlugin, SplitText, Draggable, InertiaPlugin };
export default gsap;
