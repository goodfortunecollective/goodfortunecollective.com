<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';

	const arrowStyle = cva('', {
		variants: {
			theme: {
				light: 'bg-zinc-200 before:bg-black',
				dark: 'bg-white before:bg-rose-50'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	const arrowHoverStyle = cva('', {
		variants: {
			theme: {
				light: 'bg-white before:bg-white after:bg-white',
				dark: 'bg-black before:bg-black after:bg-black'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	export let href = '';
	export let label = '';
	export let isExternal = false;
</script>

<a
	{...$$restProps}
	{href}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener' : undefined}
	class={cls(
		'c-link',
		'3xl:text-md inline-flex h-10 flex-row items-stretch overflow-hidden text-xs font-bold uppercase tracking-widest hover:no-underline 4xl:text-lg'
	)}
>
	{#if label}
		<span class="flex items-center pr-4">{label}</span>
	{/if}
	<span
		class="relative ml-[50px] flex items-center justify-center text-4xl 3xl:text-5xl 4xl:text-6xl"
	>
		<span
			class={cls('bg-black before:bg-black after:bg-black', 'c-link__arrow c-link__arrow-default')}
		></span>
		<span
			class={cls(
				'flex items-center justify-center',
				'c-link__circle',
				arrowStyle({ theme: $backgroundTheme })
			)}
		>
			<span
				class={cls(
					'c-link__arrow c-link__arrow-hover',
					arrowHoverStyle({ theme: $backgroundTheme })
				)}
			></span>
		</span>
	</span>
</a>

<style lang="scss">
	@use '../../vars' as *;

	.c-link {
		&:hover {
			.c-link__circle {
				&:before {
					transform: scale(1) translate(0, 0);
				}
			}

			.c-link__arrow-default {
				//transform: scale(0, 1) translate(45px, 0);
				transform: translate3d(200%, 0, 0);
				transition:
					0.5s 0.05s transform $ease-out-expo,
					0.5s opacity $ease-out-expo;
			}

			.c-link__arrow-hover {
				transform: translate(0, 0);
			}
		}
	}

	.c-link__circle {
		position: absolute;
		right: 0;
		width: 40px;
		height: 40px;
		border-radius: 40px;
		overflow: hidden;
		overflow: hidden;
		z-index: 8;

		&:before {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 40px;
			transform: scale(1.2) translate(-100%, 0);
			z-index: 9;
			content: '';
			transition:
				0.5s transform $ease-out-expo,
				0.5s opacity $ease-out-expo;
		}
	}

	.c-link__arrow {
		position: absolute;
		width: 50%;
		height: 1px;
		transition:
			0.5s transform $ease-out-expo,
			0.5s opacity $ease-out-expo;

		&:before,
		&:after {
			width: 4px;
			height: 1px;
			position: absolute;
			top: 0;
			right: 0;
			content: '';
		}

		&:before {
			transform: rotate(40deg);
			transform-origin: top right;
		}

		&:after {
			transform: rotate(-40deg);
			transform-origin: bottom right;
		}

		&.c-link__arrow-default {
			width: 29px;
			right: 20px;
			z-index: 15;
			transform-origin: 100% 50%;
			transition-delay: 0.2s;
		}

		&.c-link__arrow-hover {
			width: 38%;
			transform: translate3d(-200%, 0, 0);
			z-index: 10;
			transition:
				0.5s 0.1s transform $ease-out-expo,
				0.5s opacity $ease-out-expo;
		}
	}
</style>
