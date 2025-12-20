<template>
	<footer class="footer">
		<p class="footer-quote">
			<span class="need-to-contact">Need to contact me?</span>
			<span>Reach me at my social media platforms.</span>
			<span>
				Made with
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#cf4444"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-heart-icon lucide-heart"
				>
					<path
						d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
					/>
				</svg>
				by Eric Wu.
			</span>
		</p>
		<div class="footer-links">
			<a href="mailto:eric@ericwu.cv" class="footer-link">
				<span>EMAIL</span>
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
			<a
				href="https://github.com/ericsbytes"
				target="_blank"
				class="footer-link"
			>
				<span>GITHUB</span>
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
			<a
				href="https://linkedin.com/in/eric-h-wu"
				target="_blank"
				class="footer-link"
			>
				<span>LINKEDIN</span>
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
		</div>
	</footer>
</template>

<script setup lang="ts">
	defineProps({});
</script>

<style scoped>
	.footer {
		padding: 32px 64px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
		border-top: 2px solid #eaeaed;
	}

	.footer-quote {
		color: #3a3b44;
		font-size: 16px;
		line-height: 1.4;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 0;
	}

	.need-to-contact {
		color: #8282bf;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-align: right;
	}

	.footer-link {
		font-family: 'Space Mono', monospace;
		font-size: 16px;
		line-height: 1.4;
		color: #3a3b44;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
	}

	.footer-link:hover {
		color: #8282bf;
	}

	.footer-link svg {
		width: 20px;
		height: 20px;
	}

	/* Tablets */
	@media (max-width: 1024px) {
		.footer {
			padding: 24px 48px;
		}
	}

	/* Mobile landscape and small tablets */
	@media (max-width: 768px) {
		.footer {
			padding: 20px 24px;
			flex-direction: column;
			gap: 24px;
			align-items: flex-start;
		}

		.footer-quote {
			white-space: normal;
		}

		.footer-links {
			text-align: left;
			width: 100%;
			gap: 4px;
		}

		.footer-link {
			justify-content: flex-start;
		}
	}

	/* Small mobile */
	@media (max-width: 480px) {
		.footer {
			padding: 24px 16px;
		}

		.footer-links {
			flex-wrap: wrap;
			gap: 4px;
		}
	}
</style>
