<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import { cls } from '$lib/styles';

	export let blok: any;

	export let theme: 'dark' | 'light' = 'light';

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
</script>

<footer
	use:storyblokEditable={blok}
	{...$$restProps}
	id="footer"
	class={cls('pt-1 -translate-y-1', variants({ theme: theme }))}
>
	<div class="w-full py-6 mx-auto">
		<div class="grid grid-cols-12 py-2">
			<div class="col-span-4 col-start-2 pt-8 pb-2 footer-col">
				<p class="flex gap-4 text-xs 3xl:text-sm leading-5 tracking-wider text-gray-500 uppercase">
					<strong>Let’s work together</strong>
					<a href={`mailto:${blok.email}`}>{blok.email}</a>
				</p>
			</div>
			<div class="col-span-4 col-start-8 pt-8 pb-2 footer-col">
				<p class="flex gap-4 text-xs 3xl:text-sm leading-5 tracking-wider text-gray-500 uppercase">
					<strong>Find us in</strong><span>Vancouver, Canada</span>
				</p>
			</div>
		</div>
		<div class="grid grid-cols-12 py-2">
			<div class="col-span-4 col-start-2 pt-2 pb-8 text-sm text-gray-400 md:pb-0">
				<StoryblokComponent blok={blok.social_links[0]} />
				<!--<SocialLinks />-->
			</div>
			<!-- <div class="flex justify-center pb-8 space-x-6 text-sm md:pb-0">
				<a
					href="https://www.facebook.com/GoodFortuneCollective/"
					class="text-gray-400 hover:text-gray-500"
				>
					<span class="sr-only">Facebook</span>
					<span class="">Fb</span>
				</a>
				<a
					href="https://www.instagram.com/goodfortunecollective/"
					class="text-gray-400 hover:text-gray-500"
				>
					<span class="sr-only">Instagram</span>
					<span class="">Ig</span>
				</a>
				<a href="https://vimeo.com/goodfortunecollective" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">Vimeo</span>
					<span class="">Vi</span>
				</a>
				<a href="https://www.behance.net/" class="text-gray-400 hover:text-gray-500">
					<span class="sr-only">Behance</span>
					<span class="">Be</span>
				</a>
			</div> -->
			<div class="col-span-4 col-start-8">
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
