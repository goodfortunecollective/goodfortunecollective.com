<script lang="ts">
	export let href = '';
	export let label = '';
	export let isExternal = false;
</script>

<a
	{...$$restProps}
	{href}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener' : undefined}
	class="3xl:text-md link flex h-10 flex-row items-stretch text-xs font-bold uppercase tracking-widest 4xl:text-lg"
>
	{#if label}
		<span class="flex items-center pr-4">{label}</span>{/if}
	<span
		class="relative ml-[50px] flex items-center justify-center text-4xl 3xl:text-5xl 4xl:text-6xl"
	>
		<span class="arrow arrow-default" /><span class="link-circle flex items-center justify-center">
			<span class="arrow arrow-hover" />
		</span>
	</span></a
>

<style lang="scss">
	@import '../../vars.scss';

	.link {
		display: inline-flex;
		overflow: hidden;

		&:hover {
			.link-circle {
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
			transform: translate3d(-200%, 0, 0);
			z-index: 10;
			transition:
				0.5s 0.1s transform $ease-out-expo,
				0.5s opacity $ease-out-expo;

			&:before,
			&:after {
				background: $white;
			}
		}
	}
</style>
