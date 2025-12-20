<template>
	<aside class="sidebar">
		<a href="/" class="nav-slash">/</a>
		<div class="sidebar-bottom">
			<div class="sidebar-divider" />
			<div class="social-icons">
				<a
					href="https://github.com/ericsbytes"
					target="_blank"
					class="icon-link"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						/>
					</svg>
				</a>
				<a
					href="https://linkedin.com/in/eric-h-wu"
					target="_blank"
					class="icon-link"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						/>
						<rect x="2" y="9" width="4" height="12" />
						<circle cx="4" cy="4" r="2" />
					</svg>
				</a>
				<a href="mailto:eric@ericwu.cv" class="icon-link">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
						/>
						<polyline points="22,6 12,13 2,6" />
					</svg>
				</a>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts"></script>

<style scoped>
	.sidebar {
		width: 148px;
		padding: 64px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		border-right: 2px solid #eaeaed;
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		background-color: #fafafc;
		z-index: 100;
	}

	.sidebar-bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.sidebar-divider {
		width: 100%;
		height: 2px;
		background-color: #eaeaed;
		margin-bottom: 64px;
	}

	.nav-slash {
		font-family: 'Space Mono', monospace;
		font-size: 20px;
		color: #3a3b44;
		text-decoration: none;
		transition: color 0.2s;
	}

	.nav-slash:hover {
		color: #8282bf;
	}

	.social-icons {
		display: flex;
		flex-direction: column;
		gap: 48px;
		align-items: center;
	}

	.icon-link {
		color: #aaaaaf;
		transition: color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-link:hover {
		color: #3a3b44;
	}

	/* Tablets */
	@media (max-width: 1024px) {
		.sidebar {
			width: 120px;
			padding: 48px 0;
		}

		.sidebar-divider {
			margin-bottom: 48px;
		}

		.social-icons {
			gap: 32px;
		}
	}

	/* Mobile landscape and small tablets */
	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}
	}
</style>
