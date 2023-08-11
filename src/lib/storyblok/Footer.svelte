<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { cls } from '$lib/styles';

	export let blok: any;

	const getTheme = (pathname: string) => {
		return pathname === '/' ? 'dark' : 'light';
	};

	let theme: 'light' | 'dark' = getTheme($page.url.pathname);

	const variants = cva('', {
		variants: {
			theme: {
				light: '',
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
</script>

<footer
	use:storyblokEditable={blok}
	{...$$restProps}
	id="footer"
	class={cls('pt-1 -translate-y-1', variants({ theme }))}
>
	<div class="w-full py-6">
		<div class="grid grid-cols-12 py-2">
			<div
				class="col-span-10 md:col-span-5 lg:col-span-4 col-start-2 md:col-start-2 lg:col-start-2 pt-8 pb-2 footer-col"
			>
				<p
					class="flex flex-col md:flex-row gap-4 text-xs 3xl:text-sm leading-5 tracking-wider text-gray-500 uppercase"
				>
					<strong>Let’s work together</strong>
					<a href={`mailto:${blok.email}`}>{blok.email}</a>
				</p>
			</div>
			<div class="col-span-10 md:col-span-4 col-start-2 md:col-start-8 pt-8 pb-2 footer-col">
				<p
					class="flex flex-col md:flex-row gap-4 text-xs 3xl:text-sm leading-5 tracking-wider text-gray-500 uppercase"
				>
					<strong>Find us in</strong><span>Vancouver, Canada</span>
				</p>
			</div>
		</div>
		<div class="grid grid-cols-12 py-2">
			<div
				class="col-span-10 md:col-span-4 col-start-2 md:col-start-2 pt-2 pb-4 md:pb-0 text-sm text-gray-400"
			>
				<StoryblokComponent blok={blok.social_links[0]} />
			</div>
			<div
				class="col-span-10 md:col-span-4 lg:col-span-4 col-start-2 md:col-start-8 lg:col-start-8"
			>
				<p class="text-xs 3xl:text-sm leading-5 tracking-wider text-gray-500 uppercase">
					&copy; {new Date().getFullYear().toString()} Good Fortune Collective. All rights reserved.
				</p>
			</div>
		</div>
	</div>
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
</style>
