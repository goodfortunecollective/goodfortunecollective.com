<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	export let name: string | null = null;
	export let animated: boolean = false;
	export let type: 'hover' | 'theme' = 'theme';

	let el!: HTMLElement;

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
</script>

{#key name}
	<h2
		class={cls('overflow-hidden p-8 font-degular-display leading-extra-tight', 'c-project-title')}
	>
		<span
			in:slide|global={{ duration: animated ? 300 : 0, delay: animated ? 100 : 0 }}
			out:slide|global={{ duration: animated ? 200 : 0 }}
			class={cls(
				'block',
				type === 'theme' && variantsTheme({ theme: $backgroundTheme }),
				type === 'hover' && variantsHover({ theme: $backgroundTheme })
			)}>{name}</span
		>
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
