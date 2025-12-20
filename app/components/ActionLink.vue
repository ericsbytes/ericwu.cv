<template>
	<a :href="href" :target="target" :rel="rel" v-bind="$attrs">
		<span>{{ text }}</span>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M7 7h10v10" />
			<path d="M7 17 17 7" />
		</svg>
	</a>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps<{
		href: string;
		text: string;
		target?: string;
	}>();

	const rel = computed(() =>
		props.target === '_blank' ? 'noopener noreferrer' : undefined
	);
</script>

<!-- This component forwards any extra attributes (class, style, aria-*) to the anchor. -->

<style scoped>
	a {
		margin-top: 16px;
		font-size: 16px;
		color: #8282bf;
		text-decoration: none;
		background-image: linear-gradient(currentColor, currentColor);
		background-size: 0% 1px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding-bottom: 2px;
		transition: background-size 0.2s ease;
	}

	a svg {
		text-decoration: inherit;
	}

	a:hover,
	a:focus-visible {
		background-size: calc(100% - 4px) 1px;
	}
</style>
