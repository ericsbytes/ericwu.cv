<template>
	<div class="page-content">
		<!-- Hero Section -->
		<section class="hero">
			<h2 class="greeting">Hey!</h2>
			<h1 class="title">I'm <strong>Eric</strong>.</h1>
			<p class="intro">
				A
				<span class="keyword" :class="{ active: activeKeyword === 0 }">
					computer scientist</span
				>,
				<span class="keyword" :class="{ active: activeKeyword === 1 }">
					philosopher</span
				>,
				<span class="keyword" :class="{ active: activeKeyword === 2 }">
					designer</span
				>,
				<span class="keyword" :class="{ active: activeKeyword === 3 }">
					video-game developer
				</span>
				and
				<span
					class="keyword tea"
					:class="{ active: activeKeyword === 4 }"
				>
					tea enthusiast</span
				>.
				<img
					src="/images/teacup_without_handle_animated.png"
					alt="Tea cup"
					class="tea-emoji"
				/>
			</p>
			<p class="description">
				I have a wide variety of interests. Currently, I'm exploring
				multi-agent reinforcement-learning systems, formal logic and
				verification, and meta-ethics.
			</p>
		</section>

		<!-- Two Column Layout -->
		<div class="two-column-layout">
			<!-- Left Column -->
			<div class="left-column">
				<!-- Latest Thought -->
				<section class="latest-thought">
					<h3 class="section-title">Latest thought</h3>
					<h4 class="thought-title">
						What is it with all the stuff happening?
					</h4>
					<p class="thought-preview">December 24th, 2025</p>
					<ActionLink href="/thoughts" text="Read more" />
				</section>

				<!-- Currently Listening -->
				<section class="listening">
					<h3 class="section-title">My top albums this month</h3>
					<div class="album-marquee">
						<div class="album-track">
							<template v-if="displayAlbums.length">
								<img
									v-for="a in displayAlbums"
									:key="a.id"
									:src="a.image"
									:alt="a.name"
									class="album-img"
									loading="lazy"
									decoding="async"
								/>
								<img
									v-for="a in displayAlbums"
									:key="'dup-' + a.id"
									:src="a.image"
									:alt="a.name"
									class="album-img"
									loading="lazy"
									decoding="async"
								/>
							</template>
							<template v-else>
								<div
									v-for="i in 10"
									:key="i"
									class="album-placeholder"
								/>
								<div
									v-for="i in 10"
									:key="'dup-' + i"
									class="album-placeholder"
								/>
							</template>
						</div>
					</div>
					<ActionLink
						href="https://stats.fm/user/lights"
						text="See stats"
						target="_blank"
					/>
				</section>
			</div>

			<!-- Right Column -->
			<div class="right-column">
				<!-- Current Activities -->
				<section class="current-activities">
					<h3 class="section-title">What I'm currently up to</h3>
					<div class="activities-list">
						<div class="activity">
							<a
								href="https://brown.edu"
								target="_blank"
								class="company-logo"
							>
								<img
									src="/images/brown-university.png"
									alt="Brown University"
									class="logo-img"
								/>
							</a>
							<div class="activity-content">
								<h4>Sophomore, CS & Philosophy</h4>
								<p class="activity-subtitle">
									Brown University
								</p>
							</div>
						</div>
						<div class="activity">
							<a
								href="https://cs.brown.edu"
								target="_blank"
								class="company-logo"
							>
								<img
									src="/images/brown-university.png"
									alt="Brown CS"
									class="logo-img"
								/>
							</a>
							<div class="activity-content">
								<h4>Teaching & Research Assistant</h4>
								<p class="activity-subtitle">
									Department of Computer Science, Brown
									University
								</p>
							</div>
						</div>
						<div class="activity">
							<a
								href="https://unitedwayri.org"
								target="_blank"
								class="company-logo"
							>
								<img
									src="/images/united-way.svg"
									alt="United Way"
									class="logo-img"
								/>
							</a>
							<div class="activity-content">
								<h4>Volunteer Intern, Philanthropy</h4>
								<p class="activity-subtitle">
									United Way of Rhode Island
								</p>
							</div>
						</div>
					</div>
					<ActionLink href="/resume" text="See more" />
				</section>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
	import { useHead, useRuntimeConfig } from '#app';
	import ActionLink from '~/components/ActionLink.vue';

	const config = useRuntimeConfig();

	const activeKeyword = ref<number>(0);
	const keywordCount = 5;
	const baseDelayMs = 1000;
	const teaPauseMs = 5000;
	let keywordTimer: ReturnType<typeof setTimeout> | null = null;

	const clearTimer = () => {
		if (keywordTimer) clearTimeout(keywordTimer);
	};

	const scheduleNext = () => {
		const isTea = activeKeyword.value === keywordCount - 1;
		keywordTimer = setTimeout(() => {
			if (isTea) {
				// Let tea fade back to base, then pause before restarting the loop.
				activeKeyword.value = -1;
				keywordTimer = setTimeout(() => {
					activeKeyword.value = 0;
					scheduleNext();
				}, teaPauseMs);
				return;
			}

			activeKeyword.value = (activeKeyword.value + 1) % keywordCount;
			scheduleNext();
		}, baseDelayMs);
	};

	useHead({
		title: 'Eric Wu · Computer Scientist & Philosopher',
		meta: [
			{
				name: 'description',
				content:
					"Eric Wu's personal website. Computer scientist, philosopher, designer, and tea enthusiast.",
			},
		],
	});

	onMounted(() => {
		scheduleNext();
	});

	onBeforeUnmount(() => {
		clearTimer();
	});

	// Top albums (stats.fm)
	type TopAlbum = { id: number | string; name: string; image: string };
	const albums = ref<TopAlbum[]>([]);
	const displayAlbums = computed(() => albums.value.slice(0, 10));

	onMounted(async () => {
		try {
			const userId = config.public?.statsfmUserId;
			const range = config.public?.statsfmRange;
			const url = `https://api.stats.fm/api/v1/users/${userId}/top/albums?range=${range}`;
			const res = await fetch(url);
			if (!res.ok) throw new Error(`stats.fm ${res.status}`);
			const data = await res.json();
			const items = Array.isArray(data?.items) ? data.items : [];
			albums.value = items
				.map(
					(it: Record<string, unknown>) =>
						(it as Record<string, unknown>)?.album
				)
				.filter((a: Record<string, unknown>) => a && a.image)
				.map((a: Record<string, unknown>) => ({
					id:
						(a.id as string | undefined) ??
						(
							(
								a.externalIds as
									| Record<string, unknown[]>
									| undefined
							)?.appleMusic as string[] | undefined
						)?.[0] ??
						(a.name as string),
					name: a.name,
					image: a.image,
				}))
				.slice(0, 10);
		} catch {
			// Keep placeholders on error
		}
	});
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

	.hero {
		padding: 64px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.greeting {
		font-size: 16px;
		font-weight: 400;
		color: #8282bf;
		margin-bottom: 12px;
		text-transform: uppercase;
		font-family: 'Space Mono', monospace;
	}

	.title {
		font-size: 32px;
		font-weight: 400;
		margin-bottom: 12px;
	}

	.title strong {
		font-weight: 700;
	}

	.intro {
		font-size: 20px;
		line-height: 1.5;
		margin-bottom: 12px;
	}

	.keyword {
		color: #3a3b44;
		transition: color 0.4s ease;
	}

	.keyword.active {
		color: #8282bf;
	}

	.keyword.tea.active {
		color: #6f9a63;
	}

	.tea-emoji {
		width: 24px;
		height: 24px;
		object-fit: contain;
		margin-left: 6px;
		margin-bottom: 6px;
		vertical-align: middle;
	}

	.description {
		font-size: 20px;
		line-height: 1.5;
		color: #3a3b44;
	}

	.two-column-layout {
		display: grid;
		grid-template-columns: minmax(400px, 590px) 1fr;
	}

	.left-column {
		border-right: 2px solid #eaeaed;
		overflow: hidden;
	}

	.current-activities {
		padding: 48px 64px;
	}

	.section-title {
		font-size: 16px;
		font-weight: 400;
		color: #8282bf;
		margin-bottom: 16px;
		font-family: 'Space Mono', monospace;
		text-transform: uppercase;
	}

	.activities-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.activity {
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}

	.company-logo {
		flex-shrink: 0;
		width: 64px;
		height: 64px;
	}

	.logo-img {
		width: 64px;
		height: 64px;
		object-fit: contain;
	}

	.activity-content h4 {
		font-size: 20px;
		font-weight: 400;
	}

	.activity-subtitle {
		font-size: 16px;
		color: #aaaaaf;
	}

	.latest-thought {
		padding: 48px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.thought-title {
		font-size: 20px;
		font-weight: 400;
		color: #3a3b44;
		margin-bottom: 4px;
	}

	.thought-preview {
		font-size: 16px;
		color: #aaaaaf;
	}

	.listening {
		padding: 48px 64px;
		overflow: hidden;
	}

	.album-marquee {
		overflow: hidden;
		width: 100%;
		position: relative;
	}

	.album-track {
		display: flex;
		gap: 8px;
		animation: scroll 20s linear infinite;
		will-change: transform;
	}

	.album-track:hover {
		animation-play-state: paused;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-100px * 10 - 8px * 10));
		}
	}

	.album-placeholder {
		width: 100px;
		height: 100px;
		background-color: #eaeaed;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.album-img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 4px;
		flex-shrink: 0;
		background-color: #eaeaed;
	}

	.empty-state {
		text-align: center;
		padding: 48px 0;
		color: #aaaaaf;
		font-size: 16px;
	}

	/* Tablet landscape and smaller desktops */
	@media (max-width: 1200px) {
		.two-column-layout {
			grid-template-columns: 1fr;
		}

		.right-column {
			order: 1;
		}

		.left-column {
			order: 2;
			border-right: none;
			border-top: 2px solid #eaeaed;
		}

		.album-track {
			animation: scroll 15s linear infinite;
		}
	}

	/* Tablet portrait */
	@media (max-width: 1024px) {
		.hero {
			padding: 32px 48px;
		}

		.current-activities,
		.latest-thought,
		.listening {
			padding: 32px 48px;
		}
	}

	/* Mobile landscape and small tablets */
	@media (max-width: 768px) {
		.two-column-layout {
			grid-template-columns: 1fr;
		}

		.left-column {
			border-right: none;
			border-top: 2px solid #eaeaed;
		}

		.hero,
		.current-activities,
		.latest-thought,
		.listening {
			padding: 32px 24px;
		}

		.album-track {
			animation: scroll 25s linear infinite;
		}

		.activities-list {
			gap: 24px;
		}

		.activity {
			gap: 12px;
		}

		.company-logo,
		.logo-img {
			width: 48px;
			height: 48px;
		}

		.activity-subtitle {
			font-size: 16px;
		}
	}

	/* Mobile portrait */
	@media (max-width: 480px) {
		.hero,
		.current-activities,
		.latest-thought,
		.listening {
			padding: 24px 16px;
		}

		.greeting {
			font-size: 16px;
		}

		.title {
			font-size: 24px;
		}

		.intro {
			font-size: 16px;
		}

		.description {
			font-size: 16px;
		}

		.section-title {
			font-size: 14px;
		}

		.thought-title,
		.activity-content h4 {
			font-size: 16px;
		}

		.thought-preview,
		.activity-subtitle {
			font-size: 16px;
		}

		.album-placeholder,
		.album-img {
			width: 80px;
			height: 80px;
		}

		@keyframes scroll {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(calc(-80px * 10 - 8px * 10));
			}
		}

		.album-track {
			animation: scroll 30s linear infinite;
		}

		.company-logo,
		.logo-img {
			width: 40px;
			height: 40px;
		}

		.tea-emoji {
			width: 20px;
			height: 20px;
		}
	}

	/* Very small mobile devices */
	@media (max-width: 360px) {
		.album-placeholder,
		.album-img {
			width: 70px;
			height: 70px;
		}

		@keyframes scroll {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(calc(-70px * 10 - 8px * 10));
			}
		}
	}
</style>
