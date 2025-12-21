<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="page-content">
		<section class="thought-hero">
			<h1 class="thought-title">{{ thought?.title }}</h1>
			<p class="thought-subtitle">{{ thought?.subtitle }}</p>
			<time class="thought-date">{{ formatDate(dateToShow) }}</time>
		</section>

		<div class="thought-container">
			<div class="thought-body">
				<div class="thought-image-container">
					<img
						v-if="imageUrl"
						:src="imageUrl"
						class="thought-hero-image"
						alt="Thought image"
					/>
				</div>
				<article ref="articleRef" class="thought-article">
					<SanityContent
						v-if="contentToRender"
						:value="(contentToRender as any)"
					/>
				</article>
			</div>

			<aside class="footnotes" aria-label="Footnotes">
				<div class="footnotes-inner">
					<ol class="fn-list">
						<li
							v-for="fn in footnotes"
							:id="`fn-${fn.id}`"
							:key="fn.id"
							v-html="fn.html"
						/>
					</ol>
				</div>
			</aside>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted, computed, watch, nextTick } from 'vue';
	import {
		useRoute,
		useSanity,
		useAsyncData,
		useRuntimeConfig,
	} from '#imports';
	import { createImageUrlBuilder } from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url';

	interface Thought {
		_id?: string;
		title?: string;
		subtitle?: string;
		date?: string | number | Date | null;
		content?: unknown;
		image?: unknown;
		body?: unknown;
		publishedAt?: string | null;
		_createdAt?: string | null;
	}

	const route = useRoute();
	const slug = route.params.slug as string;

	const query = `*[_type == "thought" && slug.current == $slug][0]{_id, title, subtitle, date, content, body, image, publishedAt, _createdAt}`;
	const sanityClient = useSanity();
	const { data: sanityData, error: sanityError } = useAsyncData(
		() => `thought-${slug}`,
		() => sanityClient.fetch(query, { slug })
	);

	const thought = computed<Thought | null>(
		() => (sanityData.value as Thought) || null
	);

	// Sanity image URL builder
	const config = useRuntimeConfig();
	const builder = createImageUrlBuilder({
		projectId: config.public.sanity?.projectId,
		dataset: config.public.sanity?.dataset,
	});

	function urlFor(source?: SanityImageSource | unknown) {
		return source
			? builder.image(source as SanityImageSource).url()
			: undefined;
	}

	const imageUrl = computed(() => {
		const t = thought.value;
		if (!t) return undefined;
		return t.image ? urlFor(t.image as SanityImageSource) : undefined;
	});

	const contentToRender = computed(() => {
		const t = thought.value;
		return (t?.content ?? t?.body) as unknown;
	});

	const dateToShow = computed(() => {
		const t = thought.value;
		return t?.date ?? t?.publishedAt ?? t?._createdAt;
	});

	// Watch sanityData for debugging when content fails to load
	watch(sanityData, v => {
		console.log('[thoughts][slug] sanityData changed:', v);
	});

	watch(thought, v => {
		console.log('[thoughts][slug] thought computed:', v);
		if (v && v.content) {
			nextTick(() => extractFootnotes());
		}
	});

	function formatDate(d: string | number | Date | null | undefined) {
		if (!d) return '';
		try {
			return new Date(d as string).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		} catch {
			return String(d);
		}
	}

	const articleRef = ref<HTMLElement | null>(null);
	const footnotes = ref<Array<{ id: string; html: string }>>([]);

	function extractFootnotes() {
		const root = articleRef.value;
		if (!root) return;

		// Attempt to discover footnotes in rendered content. Support a few common patterns:
		// 1) Inline refs: <sup data-footnote-id="1">1</sup>
		// 2) Footnote blocks: <section class="footnotes"><ol><li data-footnote="1">...</li></ol></section>
		// 3) Marks with class "footnote-ref" and footnote blocks with class "footnote"

		// Collect footnote blocks from the article
		const blocks: Record<string, string> = {};

		// pattern A: <li data-footnote="id"> ...</li>
		root.querySelectorAll('li[data-footnote]').forEach(el => {
			const id = el.getAttribute('data-footnote') || el.id || '';
			if (id) blocks[id] = el.innerHTML.trim();
		});

		// pattern B: <section class="footnotes"> ... <li id="fn:1"> ...</li>
		root.querySelectorAll(
			'.footnotes li[id], section.footnotes li[id]'
		).forEach(el => {
			const id = el.id.replace(/^fn[:#-]?/, '') || el.id;
			if (id) blocks[id] = el.innerHTML.trim();
		});

		// pattern C: elements with attribute data-footnote-id on inline refs and elements with data-footnote-id on blocks
		root.querySelectorAll('[data-footnote-id]').forEach(el => {
			const id = el.getAttribute('data-footnote-id') || '';
			// skip inline refs
			if (
				el.tagName.toLowerCase() === 'li' ||
				el.classList.contains('footnote') ||
				el.closest('.footnotes')
			) {
				if (id) blocks[id] = el.innerHTML.trim();
			}
		});

		// If we found nothing, try to find a trailing .footnotes section outside the article
		if (Object.keys(blocks).length === 0) {
			const outside = document.querySelectorAll(
				'.footnotes, section.footnotes, .post-footnotes'
			);
			outside.forEach(sec => {
				sec.querySelectorAll('li').forEach(li => {
					const id =
						li.getAttribute('data-footnote') ||
						li.id ||
						li.getAttribute('aria-id') ||
						'';
					if (id) blocks[id] = li.innerHTML.trim();
				});
			});
		}

		// Build array of footnotes ordered by discovery of inline refs
		const seen = new Set<string>();
		const refs = root.querySelectorAll(
			'sup[data-footnote-id], a[data-footnote-id], span.footnote-ref, sup.footnote-ref'
		);
		refs.forEach((r, i) => {
			const id =
				r.getAttribute('data-footnote-id') ||
				r.textContent?.trim() ||
				String(i + 1);
			if (!id) return;
			if (seen.has(id)) return;
			seen.add(id);
			const html = blocks[id] ?? `<a href="#fn-${id}">[${id}]</a>`;
			footnotes.value.push({ id, html });
		});

		// If no inline refs were found but blocks exist, push blocks in DOM order
		if (footnotes.value.length === 0 && Object.keys(blocks).length > 0) {
			Object.keys(blocks).forEach(id => {
				footnotes.value.push({ id, html: blocks[id] ?? '' });
			});
		}
	}

	onMounted(() => {
		console.log(
			'[thoughts][slug] mounted, slug=',
			slug,
			'sanityData=',
			sanityData.value,
			'error=',
			sanityError?.value
		);
		if (thought.value && thought.value.content) {
			nextTick(() => extractFootnotes());
		}
	});

	useHead({
		title: `${thought.value?.title || ''} · Thoughts · Eric Wu`,
		meta: [
			{
				name: 'description',
				content: thought.value?.subtitle || 'A thought by Eric Wu.',
			},
		],
	});
</script>

<style scoped>
	.thought-hero {
		padding: 64px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.thought-title {
		font-size: 32px;
		font-weight: 700;
		color: #3a3b44;
		margin-bottom: 4px;
		margin-top: 0;
	}

	.thought-subtitle {
		font-size: 20px;
		line-height: 1.5;
		color: #aaaaaf;
		margin: 0;
	}

	.thought-date {
		font-size: 16px;
		color: #8282bf;
		font-family: 'Space Mono', monospace;
		text-transform: uppercase;
		margin-top: 8px;
		display: block;
	}

	.thought-container {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
	}

	.thought-image-container {
		overflow: hidden;
		border-bottom: 2px solid #eaeaed;
	}

	.thought-hero-image {
		width: 100%;
		object-fit: cover;
		display: block;
	}

	.thought-body {
		max-width: 769px;
		display: flex;
		flex-direction: column;
		border-right: 2px solid #eaeaed;
	}

	.thought-article {
		font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
			sans-serif;
		font-size: 16px;
		margin: 48px 64px;
	}

	.thought-article ::v-deep :first-child {
		margin-top: 0;
	}

	.thought-article ::v-deep :last-child {
		margin-bottom: 0;
	}

	.thought-article ::v-deep a {
		color: #8282bf;
		text-decoration: none;
		background-image: linear-gradient(currentColor, currentColor);
		background-size: 0% 1px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		display: inline-flex;
		align-items: center;
		transition: background-size 0.2s ease;
	}

	.thought-article ::v-deep a svg {
		text-decoration: inherit;
	}

	.thought-article ::v-deep a:hover,
	.thought-article ::v-deep a:focus-visible {
		background-size: 100% 1px;
	}

	/* Blockquote with decorative opening quotation mark */
	.thought-article ::v-deep blockquote {
		position: relative;
		padding: 8px 2.5rem;
		margin: 0;
	}

	.thought-article ::v-deep blockquote::before {
		content: '“';
		position: absolute;
		left: 0px;
		font-size: 48px;
		color: #8282bf90;
		line-height: 1;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}

	.footnotes {
		position: relative;
		padding: 48px 64px;
	}

	.footnotes-inner {
		padding-top: 4px;
	}
	.fn-heading {
		font-size: 14px;
		color: #666;
		margin: 0 0 8px;
	}
	.fn-list {
		list-style: decimal inside;
		padding: 0;
		margin: 0;
	}
	.fn-list li {
		font-size: 14px;
		color: #444;
		margin-bottom: 12px;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.thought-container {
			grid-template-columns: 1fr;
		}
		.footnotes {
			order: 2;
			margin-top: 24px;
		}
	}
</style>
