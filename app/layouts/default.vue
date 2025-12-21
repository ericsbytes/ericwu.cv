<template>
	<div class="layout-container">
		<AppSidebar />
		<main class="layout-main">
			<AppNavbar />
			<slot />
			<AppFooter />
		</main>
		<SpeedInsights />
		<Analytics />
	</div>
</template>

<script setup lang="ts">
	import AppSidebar from '~/components/AppSidebar.vue';
	import AppNavbar from '~/components/AppNavbar.vue';
	import AppFooter from '~/components/AppFooter.vue';
	import { SpeedInsights } from '@vercel/speed-insights/nuxt';
	import { Analytics } from '@vercel/analytics/nuxt';
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		margin: 0 !important;
		padding: 0 !important;
	}

	:global(body) {
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		margin: 0 !important;
		padding: 0 !important;
	}

	/* Allow scrolling on mobile */
	@media (max-width: 768px) {
		:global(html),
		:global(body) {
			overflow: auto !important;
			height: auto !important;
		}
	}

	:global(#__nuxt) {
		height: 100vh;
		width: 100vw;
	}

	.layout-container {
		min-height: 100vh;
		height: 100vh;
		width: 100vw;
		background-color: #fafafc;
		display: flex;
		font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
			sans-serif;
		color: #3a3b44;
		overflow: hidden;
	}

	.layout-main {
		flex: 1;
		padding: 0;
		margin-left: 148px;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		width: calc(100vw - 148px);
		display: flex;
		flex-direction: column;
	}

	/* Tablets */
	@media (max-width: 1024px) {
		.layout-main {
			margin-left: 120px;
			width: calc(100vw - 120px);
		}
	}

	/* Mobile landscape and small tablets */
	@media (max-width: 768px) {
		.layout-container {
			height: auto !important;
			min-height: 100vh;
			overflow: visible !important;
		}

		.layout-main {
			padding: 0;
			margin-left: 0;
			height: auto !important;
			overflow: visible !important;
			width: 100vw;
		}
	}
</style>
