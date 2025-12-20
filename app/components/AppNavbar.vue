<template>
	<header class="header">
		<nav class="nav">
			<a href="/" class="nav-home">/</a>
			<a href="/resume">RESUME</a>
			<a href="/projects">PROJECTS</a>
			<a href="/thoughts">THOUGHTS</a>
		</nav>
	</header>
</template>

<script setup lang="ts">
	defineProps({});
</script>

<style scoped>
	.header {
		padding: 64px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.nav {
		display: flex;
		gap: 64px;
	}

	.nav a {
		font-family: 'Space Mono', monospace;
		font-size: 20px;
		text-decoration: none;
		color: #3a3b44;
		transition: color 0.2s;
	}

	.nav a:hover {
		color: #8282bf;
	}

	.nav-home {
		display: none;
	}

	/* Tablets */
	@media (max-width: 1024px) {
		.header {
			padding: 48px 48px;
		}

		.nav {
			gap: 48px;
		}

		.nav a {
			font-size: 18px;
		}
	}

	/* Mobile landscape and small tablets */
	@media (max-width: 768px) {
		.header {
			padding: 32px 24px;
		}

		.nav {
			gap: 16px;
		}

		.nav a {
			font-size: 16px;
		}

		.nav-home {
			display: inline;
		}
	}

	/* Small mobile */
	@media (max-width: 480px) {
		.header {
			padding: 24px 16px;
		}

		.nav {
			gap: 12px;
		}

		.nav a {
			font-size: 14px;
		}
	}
</style>
