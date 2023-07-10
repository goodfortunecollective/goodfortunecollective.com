import { dev } from '$app/environment';
import { writable } from 'svelte/store';

export const delay_anim_page = writable(dev ? 1.5 : 6.5);