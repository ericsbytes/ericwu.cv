<template>
	<div class="page-content">
		<!-- Hero Section -->
		<section class="hero">
			<h1 class="title">Thoughts</h1>
			<p class="description">
				A collection of thoughts from a philosophy student.
			</p>
		</section>

		<!-- Thoughts List -->
		<div class="thoughts-list">
			<section
				v-for="thought in thoughts"
				:key="thought.id"
				:class="['thought-item', { 'no-image': !thought.image }]"
			>
				<div class="thought-item-header">
					<time class="thought-date">
						{{ formatDate(thought.date) }}
					</time>
					<h3 class="thought-item-title">
						<NuxtLink :to="`/thoughts/${thought.slug}`">
							{{ thought.title }}
						</NuxtLink>
					</h3>
					<p class="thought-item-subtitle">
						{{ thought.subtitle }}
					</p>
					<NuxtLink
						:to="`/thoughts/${thought.slug}`"
						class="read-more"
					>
						Continue reading
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
					</NuxtLink>
				</div>
				<NuxtLink
					v-if="thought.image"
					:to="`/thoughts/${thought.slug}`"
					class="thought-image"
				>
					<img :src="thought.image" alt="Thought image" />
				</NuxtLink>
			</section>
		</div>

		<!-- Empty State -->
		<div v-if="thoughts.length === 0" class="empty-state">
			<p>No thoughts yet. Check back soon!</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useHead } from '#app';
	import { createImageUrlBuilder } from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url';
	import { useRuntimeConfig } from '#imports';

	interface Thought {
		id: string;
		slug: string;
		title: string;
		subtitle: string;
		date: Date;
		image?: string;
	}

	// Fetch thoughts from Sanity

	const query = `*[_type == "thought"]|order(date desc){
		 _id,
		 title,
		 subtitle,
		 date,
		 slug,
		 image
	 }`;
	const { data: sanityThoughts } = useSanityQuery(query);

	const config = useRuntimeConfig();
	const builder = createImageUrlBuilder({
		projectId: config.public.sanity?.projectId,
		dataset: config.public.sanity?.dataset,
	});

	function urlFor(source: SanityImageSource) {
		return source ? builder.image(source).url() : undefined;
	}

	const thoughts = computed<Thought[]>(() => {
		const arr =
			(sanityThoughts.value as unknown as Array<
				Record<string, unknown>
			>) || [];
		return arr.map(t => ({
			id: t._id as string,
			slug:
				typeof t.slug === 'object' && t.slug && 'current' in t.slug
					? (t.slug as { current: string }).current
					: (t.slug as string),
			title: t.title as string,
			subtitle: t.subtitle as string,
			date: t.date ? new Date(t.date as string) : new Date(),
			image: t.image ? urlFor(t.image) : undefined,
		}));
	});

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	useHead({
		title: 'Thoughts · Eric Wu',
		meta: [
			{
				name: 'description',
				content: 'A collection of thoughts from a philosophy student.',
			},
		],
	});
</script>

<style scoped>
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
		color: #3a3b44;
		margin-bottom: 4px;
	}

	.description {
		font-size: 20px;
		line-height: 1.5;
		color: #3a3b44;
		margin-top: 0;
	}

	.thoughts-list {
		display: flex;
		flex-direction: column;
	}

	.thought-item {
		display: grid;
		grid-template-columns: auto 400px;
		padding: 0px 64px;
		position: relative;
		overflow: hidden;
		border-bottom: 2px solid #eaeaed;
	}

	.thought-item.no-image {
		grid-template-columns: 1fr;
	}

	.thought-item:last-child {
		border-bottom: none;
	}

	.thought-item-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		justify-content: center;
		gap: 4px;
		padding-top: 48px;
		padding-bottom: 48px;
	}

	.thought-item-title {
		font-size: 20px;
		font-weight: 400;
		margin: 0;
	}

	.thought-item-title a {
		color: #3a3b44;
		text-decoration: none;
		transition: color 0.2s;
	}

	.thought-date {
		font-size: clamp(13px, 1.5vw, 14px);
		color: #aaaaaf;
		white-space: nowrap;
	}
	.thought-date {
		font-size: 16px;
		color: #8282bf;
		font-family: 'Space Mono', monospace;
		text-transform: uppercase;
		margin-bottom: 2px;
		display: block;
		letter-spacing: 0.04em;
		font-weight: 400;
	}

	.thought-item-subtitle {
		font-size: 20px;
		line-height: 1.5;
		color: #aaaaaf;
		margin: 0;
	}

	.thought-item-header {
		flex: 1 1 0%;
		min-width: 0;
		z-index: 1;
	}

	.thought-image {
		width: 100%;
		object-fit: cover;
	}

	.thought-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
			sans-serif;
		font-size: 16px;
		color: #8282bf;
		text-decoration: none;
		background-image: linear-gradient(currentColor, currentColor);
		background-size: 0% 1px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		padding-bottom: 2px;
		transition: background-size 0.2s ease;
	}

	.read-more:hover,
	.read-more:focus-visible {
		background-size: calc(100% - 4px) 1px;
	}

	.thought-item-header .read-more {
		margin-top: 12px;
	}

	.read-more svg {
		text-decoration: inherit;
		width: 20px;
		height: 20px;
	}

	.empty-state {
		text-align: center;
		padding: 48px 0;
		color: #aaaaaf;
		font-size: 16px;
	}

	/* Tablets */
	@media (max-width: 1024px) {
		:root {
			--section-vertical-padding: 24px;
			--thought-row-height: 140px;
		}

		.hero {
			padding: 32px 48px;
		}

		.thought-item {
			grid-template-columns: auto 300px;
			padding: 0px 48px;
		}

		.thought-item-header {
			padding-top: 32px;
			padding-bottom: 32px;
		}
	}

	/* Match home page hero padding at tablet breakpoint so text aligns */
	@media (max-width: 768px) {
		.hero {
			padding: 32px 24px;
		}

		.thought-item {
			grid-template-columns: 1fr;
			padding: 24px 0px;
			gap: 24px;
		}

		.thought-item-header {
			padding: 0px 24px;
		}

		.thought-image {
			position: static;
			width: 100%;
			min-width: 0;
			max-width: 100%;
			aspect-ratio: 16 / 10;
			padding-left: 0;
			padding-right: 0;
			height: auto;
			order: -1;
		}
	}

	/* Small mobile */
	@media (max-width: 480px) {
		.hero {
			padding: 24px 16px;
		}
		:root {
			--section-vertical-padding: 16px;
			--thought-row-height: auto;
		}

		.thoughts-section {
			padding: 24px 16px;
		}

		.thought-item {
			padding: 24px 0px;
			gap: 24px;
		}

		.thought-item-header {
			flex-direction: column;
			align-items: flex-start;
			padding: 0px 16px;
		}

		.thought-date {
			width: 100%;
		}

		.thought-image {
			position: static;
			width: 100%;
			min-width: 0;
			max-width: 100%;
			aspect-ratio: 16 / 10;
			padding-left: 0;
			padding-right: 0;
			height: auto;
			order: -1;
		}

		.title {
			font-size: 24px;
		}

		.description {
			font-size: 16px;
		}

		.thought-item-title,
		.thought-item-subtitle {
			font-size: 16px;
		}

		.read-more,
		.thought-preview,
		.thought-date {
			font-size: 14px;
		}
	}
</style>
