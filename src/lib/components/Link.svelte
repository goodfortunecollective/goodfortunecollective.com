<script lang="ts">
	export let href = { url: '' };
	export let label = '';
	export let isExternal = false;
</script>

<a
	{...$$restProps}
	href={href.url}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener' : undefined}
	class="flex flex-row items-stretch h-10 text-xs font-bold tracking-widest uppercase link"
>
	<span class="flex items-center pr-4">{label}</span>
	<span class="relative flex items-center justify-center ml-[50px] text-4xl">
		<span class="arrow arrow-default" /><span class="flex items-center justify-center link-circle">
			<span class="arrow arrow-hover" />
		</span>
	</span></a
>

<style lang="scss">
	@import '../../vars.scss';

	.link {
		&:hover {
			.link-circle {
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
		}
	}

	.link-circle {
		position: absolute;
		right: 0;
		width: 40px;
		height: 40px;
		border-radius: 40px;
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
			border-radius: 40px;
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
			width: 29px;
			right: 20px;
			background: #313131;
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
