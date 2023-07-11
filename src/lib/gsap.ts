import { browser } from '$app/environment';

import { gsap } from 'gsap';
import { ScrollTrigger } from '$lib/vendors/gsap/ScrollTrigger.js';
import { MotionPathPlugin } from '$lib/vendors/gsap/MotionPathPlugin.js';
import { ScrollSmoother } from '$lib/vendors/gsap/ScrollSmoother.js';
import { SplitText } from '$lib/vendors/gsap/SplitText.js';
import { Draggable } from '$lib/vendors/gsap/Draggable.js';

if (browser) {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger, MotionPathPlugin, SplitText, Draggable);
}

export * from "gsap";
export { ScrollSmoother, ScrollTrigger, MotionPathPlugin, SplitText, Draggable };