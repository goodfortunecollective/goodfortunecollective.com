import { browser } from '$app/environment';

import { gsap } from 'gsap';
import { ScrollTrigger } from '$lib/vendors/gsap/ScrollTrigger.js';
import { MotionPathPlugin } from '$lib/vendors/gsap/MotionPathPlugin.js';
import { ScrollSmoother } from '$lib/vendors/gsap/ScrollSmoother.js';

if (browser) {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger, MotionPathPlugin);
}

export * from "gsap";
export { ScrollSmoother, ScrollTrigger, MotionPathPlugin, };