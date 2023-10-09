<script lang="ts">
	import { onMount } from 'svelte';
	import { cva } from 'class-variance-authority';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { cls } from '$lib/styles';
	import gsap, { ScrollToPlugin } from '$lib/gsap';

	export let blok: any;

	let backToTopBtn: HTMLElement;

	const getTheme = (pathname: string) => {
		return pathname === '/' || pathname === '/culture' ? 'dark' : 'light';
	};

	let theme: 'light' | 'dark' = getTheme($page.url.pathname);

	const variants = cva('', {
		variants: {
			theme: {
				light: 'light',
				dark: 'bg-black text-white'
			}
		},
		defaultVariants: {
			theme: 'light'
		}
	});

	afterNavigate(async ({ to }) => {
		theme = getTheme(to?.url.pathname!);
	});

	const backToTop = (event: any) => {
		gsap.to(window, { scrollTo: { y: 0 }, duration: 0.8 });
		event.preventDefault();
	};

	onMount(async () => {
		backToTopBtn.addEventListener('click', backToTop);
	});
</script>

<footer
	use:storyblokEditable={blok}
	{...$$restProps}
	id="footer"
	class={cls('pt-1 -translate-y-1', variants({ theme }))}
>
	<div class="relative w-full py-6">
		<div class="grid grid-cols-12 py-2">
			<div
				class="col-span-10 col-start-2 pt-8 pb-2 md:col-span-5 lg:col-span-4 md:col-start-2 lg:col-start-2 footer-col"
			>
				<p
					class="flex flex-col gap-4 text-xs leading-5 tracking-wider text-gray-500 uppercase md:flex-row 3xl:text-sm"
				>
					<strong>Let’s work together</strong>
					<a href={`mailto:${blok.email}`}>{blok.email}</a>
				</p>
			</div>
			<div class="col-span-10 col-start-2 pt-8 pb-2 md:col-span-4 md:col-start-8 footer-col">
				<p
					class="flex flex-col gap-4 text-xs leading-5 tracking-wider text-gray-500 uppercase md:flex-row 3xl:text-sm"
				>
					<strong>Find us in</strong><span>Vancouver, Canada</span>
				</p>
			</div>
		</div>
		<div class="grid grid-cols-12 py-2">
			<div
				class="col-span-10 col-start-2 pt-2 pb-4 text-sm text-gray-400 md:col-span-4 md:col-start-2 md:pb-0"
			>
				<StoryblokComponent blok={blok.social_links[0]} />
			</div>
			<div
				class="col-span-10 col-start-2 md:col-span-4 lg:col-span-4 md:col-start-8 lg:col-start-8"
			>
				<p class="text-xs leading-5 tracking-wider text-gray-500 uppercase 3xl:text-sm">
					&copy; {new Date().getFullYear().toString()} Good Fortune Collective. All rights reserved.
				</p>
			</div>
		</div>
	</div>
	<a
		href="#"
		bind:this={backToTopBtn}
		class="absolute hidden md:block right-[20px] md:right-[60px] top-[-50px] back-to-top-btn w-[20px] h-[66px]"
	>
		<div class="arrow" />
	</a>
</footer>

<style lang="scss">
	@import '../../vars.scss';

	.footer-col {
		position: relative;
		@media (min-width: $media-md) {
			overflow: hidden;

			&:before {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				height: 1px;
				background: #cccccc;
				content: '';
			}

			&:first-child {
				a {
					&:before {
						transform-origin: 0 0;
					}
				}
			}
			&:last-child {
				a {
					&:before {
						transform-origin: 100% 100%;
						transform: translate(150%, 0);
					}
				}
			}

			a {
				position: relative;
				display: inline-block;

				&:before {
					position: absolute;
					top: -2rem;
					right: 0;
					height: 1px;
					width: 100%;
					transform: translate(-200%, 0);
					background: $blackPure;
					content: '';
					transition: 0.4s width ease-out, 0.4s transform ease-out;
				}

				&:hover {
					&:before {
						width: 100%;
						transform: translate(0, 0);
					}
				}
			}
		}
	}

	.bg-black {
		background: #1a1a1a;
	}

	.back-to-top-btn {
		opacity: 0.4;
		transition: 0.5s opacity;

		&:hover {
			opacity: 0.6;
		}

		&:before {
			position: absolute;
			top: 0;
			left: 50%;
			width: 1px;
			bottom: 0;
			content: '';
			background: white;

			#footer.light & {
				background: black;
			}
		}

		&:after {
			position: absolute;
			width: 1px;
			left: 2px;
			height: 100%;
			// background: white;
			content: '';
		}

		.arrow {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, 0) rotate(-90deg);

			&:before,
			&:after {
				width: 4px;
				height: 1px;
				position: absolute;
				top: 0;
				right: 0;
				background: white;
				content: '';
				#footer.light & {
					background: black;
				}
			}

			&:before {
				transform: rotate(40deg);
				transform-origin: top right;
			}

			&:after {
				transform: rotate(-40deg);
				transform-origin: bottom right;
			}
		}
	}
</style>
