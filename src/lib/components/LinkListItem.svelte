<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { cls } from '$lib/styles';
	import { backgroundTheme, cursorType } from '$lib/stores';
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

	const onEnter = () => {
		cursorType.set('checkout');
	};

	const onLeave = () => {
		cursorType.set('none');
	};
</script>

<li>
	<a
		class={cls('c-list-item-link', 'flex w-full items-center py-4')}
		href={url}
		on:mouseenter={onEnter}
		on:mouseleave={onLeave}
	>
		<Heading
			as="h3"
			size="h3"
			on:inview_change={inViewColorTransition}
			class={variants({ theme: $backgroundTheme })}
		>
			{name}
		</Heading>
		<span
			class={cls(
				'c-list-item-link__action',
				'hidden text-xs font-bold uppercase tracking-widest lg:block'
			)}
		>
			{label}
		</span>
		<span
			class={cls(
				'bg-black before:bg-black after:bg-black',
				'c-list-item-link__arrow c-list-item-link__arrow-default'
			)}
		></span>
		<span
			class={cls(
				'flex items-center justify-center',
				'c-list-item-link__circle',
				arrowStyle({ theme: $backgroundTheme })
			)}
		>
			<span
				class={cls(
					'c-list-item-link__arrow c-list-item-link__arrow-hover',
					arrowHoverStyle({ theme: $backgroundTheme })
				)}
			></span>
		</span>
	</a>
</li>

<style lang="scss">
	@use '../../vars' as *;

	.c-list-item-link {
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
			.c-list-item-link__action {
				transform: translate(0, 0);
				opacity: 1;
			}

			.c-list-item-link__circle {
				&:before {
					transform: scale(1) translate(0, 0);
				}
			}

			.c-list-item-link__arrow-default {
				//transform: scale(0, 1) translate(45px, 0);
				transform: translate3d(200%, 0, 0);
			}

			.c-list-item-link__arrow-hover {
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

	.c-list-item-link__action {
		position: absolute;
		right: 70px;
		transform: translate(-20%, 0);
		opacity: 0;
		transition:
			0.4s transform ease-out,
			0.4s opacity ease-out;
	}

	.c-list-item-link__circle {
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

	.c-list-item-link__arrow {
		position: absolute;
		width: 50%;
		height: 1px;
		transition:
			0.3s transform $ease-out-expo,
			0.3s opacity $ease-out-expo;

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

		&.c-list-item-link__arrow-default {
			width: 29px;
			right: 20px;
			z-index: 15;
			transform-origin: 100% 50%;
		}

		&.c-list-item-link__arrow-hover {
			width: 38%;
			transform: translate3d(-200%, 0, 0);
			z-index: 10;
			transition:
				0.5s 0.1s transform $ease-out-expo,
				0.5s opacity $ease-out-expo;
		}
	}
</style>
