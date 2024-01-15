<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme } from '$lib/stores';
	import { inViewColorTransition } from '$lib/utils/animations';
	import { Heading } from '$lib/components';

	export let name: string;
	export let url: string;
	export let label: string;

	const variants = cva('duration-1000 ease-out', {
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
</script>

<li>
	<a class="list-item-link flex w-full items-center py-4" href={url}>
		<Heading
			as="h3"
			size="h3"
			on:inview_change={inViewColorTransition}
			class={variants({ theme: $backgroundTheme })}
		>
			{name}
		</Heading>
		<span class="list-item-action text-xs font-bold uppercase tracking-widest">{label}</span>
		<span class={cls('bg-black before:bg-black after:bg-black', 'arrow arrow-default')} />
		<span
			class={cls(
				'flex items-center justify-center',
				'list-item-circle',
				arrowStyle({ theme: $backgroundTheme })
			)}
		>
			<span class={cls('arrow arrow-hover', arrowHoverStyle({ theme: $backgroundTheme }))} />
		</span>
	</a>
</li>

<style lang="scss">
	@import '../../vars.scss';

	.list-item-link {
		position: relative;
		overflow: hidden;

		&:before,
		&:after {
			position: absolute;
			right: 0;
			bottom: 0;
			height: 1px;
			content: '';
		}

		&:before {
			left: 0;
			background: $gray;
		}

		&:hover {
			.list-item-action {
				transform: translate(0, 0);
				opacity: 1;
			}

			.list-item-circle {
				&:before {
					transform: scale(1) translate(0, 0);
				}
			}

			.arrow-default {
				//transform: scale(0, 1) translate(45px, 0);
				transform: translate3d(200%, 0, 0);
			}

			.arrow-hover {
				transform: translate(0, 0);
			}

			&:after {
				// animation: list-hover ease-out 0.8s;
				width: 20%;
				transform: translate(0, 0);
			}
		}
	}

	// @keyframes list-hover {
	// 	0% {
	// 		transform: translate(-100%, 0);
	// 		width: 100%;
	// 	}
	// 	100% {
	// 		transform: translate(0, 0);
	// 		width: 20%;
	// 	}
	// }

	.list-item-action {
		position: absolute;
		right: 70px;
		transform: translate(-20%, 0);
		opacity: 0;
		transition:
			0.4s transform ease-out,
			0.4s opacity ease-out;
	}

	.list-item-circle {
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

	.arrow {
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

		&.arrow-default {
			width: 29px;
			right: 20px;
			z-index: 15;
			transform-origin: 100% 50%;
		}

		&.arrow-hover {
			width: 38%;
			transform: translate3d(-200%, 0, 0);
			z-index: 10;
			transition:
				0.5s 0.1s transform $ease-out-expo,
				0.5s opacity $ease-out-expo;
		}
	}
</style>
