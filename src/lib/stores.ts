import { dev } from '$app/environment';
import { writable } from 'svelte/store';
import { CurtainsInstance } from './utils/useCurtains';

export const delay_anim_page = writable(dev ? 1.5 : 6.5);
export const curtains = writable(null as CurtainsInstance);

// page transition states
export const isTransitioning = writable(false as boolean);
export const isPageHidden = writable(false as boolean);
