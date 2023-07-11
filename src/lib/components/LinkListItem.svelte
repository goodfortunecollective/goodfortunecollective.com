<script lang="ts">
	export let name: string;
	export let url: string;
	export let label: string;
</script>

<li>
	<a class="flex items-center w-full py-4 list-item-link" href={url}>
		<span class="list-item-name">{name}</span>
		<span class="text-xs font-bold tracking-widest uppercase list-item-action">{label}</span>
		<span class="arrow arrow-default" /><span
			class="flex items-center justify-center list-item-circle"
		>
			<span class="arrow arrow-hover" />
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

		&:after {
			width: 100%;
			transform: translate(-100%, 0);
			background: $black;
			transition: 0.6s width ease-out, 0.6s transform ease-out;
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
				transform: scale(0, 1) translate(45px, 0);
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
		transition: 0.4s transform ease-out, 0.4s opacity ease-out;
	}

	.list-item-circle {
		position: absolute;
		right: 0;
		width: 36px;
		height: 36px;
		border-radius: 36px;
		overflow: hidden;
		background: $grayUltraLight;
		overflow: hidden;
		z-index: 8;

		&:before {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 36px;
			transform: scale(1.2) translate(-100%, 0);
			background: $black;
			z-index: 9;
			content: '';
			transition: 0.4s transform ease-out, 0.4s opacity ease-out;
		}
	}

	.arrow {
		position: absolute;
		width: 50%;
		height: 1px;
		transition: 0.4s transform ease-out, 0.4s opacity ease-out;

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
			width: 38px;
			right: 15px;
			background: $grayLight;
			z-index: 15;
			transform-origin: 100% 50%;

			&:before,
			&:after {
				background: $grayLight;
			}
		}

		&.arrow-hover {
			width: 38%;
			background: $white;
			transform: translate(-100%, 0);
			z-index: 10;

			&:before,
			&:after {
				background: $white;
			}
		}
	}
</style>
