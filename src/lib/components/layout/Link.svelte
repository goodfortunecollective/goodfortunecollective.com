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
	class="flex flex-row items-stretch h-10 text-xs font-bold tracking-widest uppercase"
>
	<span class="flex items-center pr-4">{label}</span>
	<span class="relative flex text-4xl"
		><span class="absolute z-10 font-normal top-[-6px]">&#10230;</span><span
			class="absolute top-0 block w-10 h-10 bg-gray-300 rounded-full left-3"
		/></span
	>
</a>
