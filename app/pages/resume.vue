<template>
	<div class="page-content">
		<section class="hero">
			<h1 class="title">Resume</h1>
			<p class="description">
				My professional experiences and skills overview.
			</p>
		</section>

		<div class="download-resume">
			<p>You can view or download my CV in PDF format.</p>
			<a href="/Eric_Wu_cv.pdf" class="download-button">View PDF </a>
		</div>

		<div class="pdf-container" aria-hidden="false">
			<iframe
				src="/Eric_Wu_cv.pdf#toolbar=0"
				class="pdf-viewer"
				title="Resume PDF"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	useHead({
		title: 'Resume · Eric Wu',
		meta: [
			{
				name: 'description',
				content: 'My professional experiences and skills overview.',
			},
			{
				property: 'og:title',
				content: 'Resume',
			},
			{
				property: 'og:description',
				content: 'My professional experiences and skills overview.',
			},
		],
	});
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.page-content {
		width: 100%;
	}

	.hero {
		padding: 64px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.title {
		font-size: 32px;
		font-weight: 700;
		color: #8282bf;
		margin-bottom: 4px;
	}

	.description {
		font-size: 20px;
		line-height: 1.5;
		color: #3a3b44;
		margin-top: 0;
	}

	.download-resume {
		display: grid;
		grid-template-columns: auto 400px;
		position: relative;
		overflow: hidden;
		border-bottom: 2px solid #eaeaed;
		align-items: center;
		gap: 16px;
	}

	.download-resume p {
		font-size: 20px;
		color: #3a3b44;
		margin: 32px 64px;
	}

	.download-button {
		font-size: 20px;
		font-family: 'Space Mono', monospace;
		color: #8282bf;
		background-color: #eeeef6;
		border-left: 2px solid #eaeaed;
		border-right: 2px solid #eaeaed;
		text-decoration: none;
		padding: 32px 0px;
		text-align: center;
		margin-right: 64px;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		box-sizing: border-box;
		transition: background-color 200ms ease;
	}

	.download-button:hover {
		background-color: #e6e6f2;
	}

	.pdf-container {
		padding: 64px 64px;
		box-sizing: border-box;
	}

	.pdf-viewer {
		width: 100%;
		height: calc(100vh);
		max-width: 100%;
		border: none;
		display: block;
	}

	@media (max-width: 900px) {
		.pdf-viewer {
			height: calc(100vh - 200px);
		}
	}

	/* Responsive breakpoints (match other pages) */
	@media (max-width: 1200px) {
		.download-resume {
			grid-template-columns: auto 1fr;
		}

		.pdf-container {
			padding: 48px 64px;
		}
	}

	@media (max-width: 1024px) {
		.hero,
		.pdf-container {
			padding: 32px 48px;
		}

		.download-resume p {
			font-size: 20px;
			color: #3a3b44;
			margin: 32px 48px;
		}

		.download-button {
			margin-right: 48px;
		}
	}

	@media (max-width: 768px) {
		.hero,
		.pdf-container {
			padding: 32px 24px;
		}

		.download-resume {
			grid-template-columns: 1fr;
			gap: 0;
			margin-right: 0;
		}

		.download-resume p {
			margin: 32px 24px;
		}

		.download-button {
			display: block;
			margin-right: 0;
			border-left: none;
			border-right: none;
			border-top: 2px solid #eaeaed;
			width: 100%;
		}

		.pdf-viewer {
			height: calc(100vh - 160px);
		}
	}

	@media (max-width: 480px) {
		.hero,
		.pdf-container {
			padding: 24px 16px;
		}

		.title {
			font-size: 24px;
		}

		.description {
			font-size: 16px;
		}

		.download-resume p {
			font-size: 16px;
			margin: 24px 16px;
		}

		.download-button {
			font-size: 18px;
			padding: 20px 0;
			width: 100%;
			margin-right: 16px;
			white-space: normal;
			text-align: center;
		}

		.pdf-viewer {
			height: calc(100vh - 140px);
		}
	}

	@media (max-width: 360px) {
		.pdf-viewer {
			height: calc(100vh - 120px);
		}
	}
</style>
