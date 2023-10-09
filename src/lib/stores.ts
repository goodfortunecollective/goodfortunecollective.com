import { dev } from '$app/environment';
import { writable } from 'svelte/store';
import type { CurtainsInstance } from './utils/useCurtains';

export const delay_anim_page = writable(dev ? 1.5 : 6.5);
export const curtains = writable(null as CurtainsInstance);

export const isIntroDone = writable(false as boolean);
export const isTransitionDone = writable(false as boolean);

// page transition states
export const isTransitioning = writable(false as boolean);
export const isPageHidden = writable(false as boolean);

// work items hover state
export const project_list_hover = writable(null as string | null);
