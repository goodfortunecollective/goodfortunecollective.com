import { browser } from '$app/environment';

import { CustomEase } from '$lib/vendors/gsap/CustomEase';
import { Draggable } from '$lib/vendors/gsap/Draggable.js';
import { Flip } from '$lib/vendors/gsap/Flip.js';
import { InertiaPlugin } from '$lib/vendors/gsap/InertiaPlugin.js';
import { MotionPathPlugin } from '$lib/vendors/gsap/MotionPathPlugin.js';
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
		ScrollToPlugin,
		ScrollTrigger,
		SplitText
	);
}


export { CustomEase, Draggable, Flip,InertiaPlugin, MotionPathPlugin, ScrollToPlugin, ScrollTrigger, SplitText };
export default gsap;
