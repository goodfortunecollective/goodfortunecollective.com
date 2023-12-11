<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	import gsap, { SplitText } from '$lib/gsap';

	export let name: string | null = null;
	export let animated: boolean = false;
	export let type: 'hover' | 'theme' = 'theme';

	let element: HTMLSpanElement;

	const variantsTheme = cva('', {
		variants: {
			theme: {
				light: '',
				dark: 'text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const variantsHover = cva('', {
		variants: {
			theme: {
				light: 'text-yellow-50 opacity-50',
				dark: 'text-black'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	function animateIn(node: HTMLElement, { delay = 0, duration = 0.3 }) {
		let tl = gsap.timeline();

		const text = new SplitText(element, {
			type: 'lines,words,chars',
			linesClass: 'split-line',
			charClass: 'split-char'
		});

		tl.from(text.chars, {
			duration,
			delay,
			ease: 'circ.out',
			yPercent: 100,
			stagger: 0.03,
			opacity: 1
		});

		return {
			/* GSAP's duration is in seconds. Svelte's is in miliseconds */
			duration: duration * 1000,
			tick: (t) => {
				tl.progress(t);
			}
		};
	}

	function animateOut(node: HTMLElement, { delay = 0, duration = 0.3 }) {
		let tl = gsap.timeline();

		const text = new SplitText(element, {
			type: 'lines,words,chars',
			linesClass: 'split-line',
			charClass: 'split-char'
		});

		tl.to(text.chars, {
			duration,
			delay,
			ease: 'circ.in',
			yPercent: -100,
			stagger: 0.01,
			opacity: 0
		});

		return {
			/* GSAP's duration is in seconds. Svelte's is in miliseconds */
			duration: duration * 1000,
			tick: (t, u) => {
				tl.progress(u);
			}
		};
	}
</script>

{#key name}
	<h2
		class={cls('overflow-hidden p-8 font-degular-display leading-extra-tight', 'c-project-title')}
	>
		<span
			in:animateIn|global={{ duration: animated ? 0.7 : 0, delay: animated ? 0.6 : 0 }}
			out:animateOut|global={{ duration: animated ? 0.4 : 0 }}
			bind:this={element}
			class={cls(
				'block',
				type === 'theme' && variantsTheme({ theme: $backgroundTheme }),
				type === 'hover' && variantsHover({ theme: $backgroundTheme })
			)}
		>
			<span class="wrap" />{name}
		</span>
	</h2>
{/key}

<style lang="scss">
	.c-project-title {
		// text-shadow: -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
		font-size: clamp(64px, calc(80px + (220 - 80) * (100vw - 768px) / (1920 - 768)), 280px);

		//font-size: clamp(16px, calc(20px + (36 - 20) * (100vw - 768px) / (1920 - 768)), 48px);

		// This text has a font size of 20px at viewport width of 768px
		// font size of 36px when viewport width is 1920px.
		// But if the viewport width is less than 768px,
		// the font-size won't get lower than 16px
		// the viewport width is more than 1920px font size will stop scaling at 48px.
	}
</style>
