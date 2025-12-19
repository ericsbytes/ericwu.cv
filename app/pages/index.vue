<template>
	<div class="container">
		<aside class="sidebar">
			<a href="/" class="nav-slash">/</a>
			<div class="sidebar-bottom">
				<div class="sidebar-divider"></div>
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
							></path>
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
							></path>
							<rect x="2" y="9" width="4" height="12"></rect>
							<circle cx="4" cy="4" r="2"></circle>
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
							></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
					</a>
				</div>
			</div>
		</aside>

		<main class="main-content">
			<!-- Header -->
			<header class="header">
				<nav class="nav">
					<a href="/resume">RESUME</a>
					<a href="/projects">PROJECTS</a>
					<a href="/thoughts">THOUGHTS</a>
				</nav>
			</header>

			<!-- Hero Section -->
			<section class="hero">
				<h2 class="greeting">Hey!</h2>
				<h1 class="title">I'm <strong>Eric</strong>.</h1>
				<p class="intro">
					A
					<span
						class="keyword"
						:class="{ active: activeKeyword === 0 }"
					>
						computer scientist</span
					>,
					<span
						class="keyword"
						:class="{ active: activeKeyword === 1 }"
					>
						philosopher</span
					>,
					<span
						class="keyword"
						:class="{ active: activeKeyword === 2 }"
					>
						designer</span
					>,
					<span
						class="keyword"
						:class="{ active: activeKeyword === 3 }"
					>
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
						<h3 class="section-title-small">Latest thought</h3>
						<h4 class="thought-title">
							What is it with all the stuff happening?
						</h4>
						<p class="thought-preview">December 24th, 2025</p>
						<a href="/thoughts" class="read-more">
							Read more
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
					</section>

					<!-- Currently Listening -->
					<section class="listening">
						<h3 class="section-title-small">
							My top albums this month
						</h3>
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
									></div>
									<div
										v-for="i in 10"
										:key="'dup-' + i"
										class="album-placeholder"
									></div>
								</template>
							</div>
						</div>
						<a
							href="https://stats.fm/user/lights"
							target="_blank"
							class="read-more"
							style="margin-top: 16px"
						>
							See stats
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
						<a
							href="/resume"
							class="read-more"
							style="margin-top: 24px"
						>
							See more
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
					</section>
				</div>
			</div>
			<footer class="footer">
				<p class="footer-quote">
					<span class="need-to-contact">Need to contact me?</span>
					<span>Reach me at my social media platforms.</span>
					<span
						>Made with
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
						by Eric Wu.</span
					>
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
		</main>
	</div>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
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
				.map((it: any) => it?.album)
				.filter((a: any) => a && a.image)
				.map((a: any) => ({
					id: a.id ?? a.externalIds?.appleMusic?.[0] ?? a.name,
					name: a.name,
					image: a.image,
				}))
				.slice(0, 10);
		} catch (e) {
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

	:global(#__nuxt) {
		height: 100vh;
		width: 100vw;
	}

	.container {
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

	.main-content {
		flex: 1;
		padding: 0;
		margin-left: 148px;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		width: calc(100vw - 148px);
	}

	.header {
		padding: 64px;
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

	.hero {
		padding: 48px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.greeting {
		font-size: 20px;
		font-weight: 400;
		color: #8282bf;
		margin-bottom: 12px;
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
		grid-template-columns: 590px 1fr;
		border-bottom: 2px solid #eaeaed;
	}

	.left-column {
		border-right: 2px solid #eaeaed;
	}

	.right-column {
	}

	.current-activities {
		padding: 48px 64px;
	}

	.section-title {
		font-size: 16px;
		font-weight: 400;
		color: #8282bf;
		margin-bottom: 16px;
	}

	.activities-list {
		display: flex;
		flex-direction: column;
		gap: 32px;
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

	.logo-placeholder {
		width: 64px;
		height: 64px;
		background-color: #eaeaed;
		border-radius: 8px;
	}

	.logo-img {
		width: 64px;
		height: 64px;
		object-fit: contain;
	}

	.activity-content h4 {
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 4px;
	}

	.activity-subtitle {
		font-size: 16px;
		color: #aaaaaf;
	}

	.latest-thought {
		padding: 48px 64px;
		border-bottom: 2px solid #eaeaed;
	}

	.section-title-small {
		font-size: 16px;
		font-weight: 400;
		color: #8282bf;
		margin-bottom: 16px;
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
		margin-bottom: 16px;
	}

	.read-more {
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

	.read-more svg {
		text-decoration: inherit;
	}

	.read-more:hover,
	.read-more:focus-visible {
		background-size: calc(100% - 4px) 1px;
	}

	.listening {
		padding: 48px 64px;
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

	.footer {
		padding: 64px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.footer-quote {
		color: #3a3b44;
		font-size: 16px;
		line-height: 1.5;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.need-to-contact {
		color: #8282bf;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: right;
	}

	.footer-link {
		font-family: 'Space Mono', monospace;
		font-size: 16px;
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

	@media (max-width: 768px) {
		.container {
			height: auto;
			overflow: visible;
		}

		.sidebar {
			display: none;
		}

		.main-content {
			padding: 0;
			margin-left: 0;
			height: auto;
			overflow: visible;
		}

		.two-column-layout {
			grid-template-columns: 1fr;
		}

		.left-column {
			border-right: none;
		}

		.header,
		.hero,
		.current-activities,
		.latest-thought,
		.listening,
		.footer {
			padding: 32px 24px;
		}

		.footer {
			flex-direction: column-reverse;
			gap: 32px;
			align-items: flex-start;
		}

		.footer-links {
			text-align: left;
		}

		.footer-link {
			justify-content: flex-start;
		}
	}
</style>
