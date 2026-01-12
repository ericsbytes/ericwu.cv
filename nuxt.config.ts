// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/sanity'],
	runtimeConfig: {
		public: {
			statsfmUserId: process.env.STATSFM_USER_ID,
			statsfmRange: 'weeks',
			siteName: 'Eric Wu - Computer Scientist & Philosopher',
		},
	},
	sanity: {
		projectId: process.env.SANITY_PROJECT_ID,
		dataset: process.env.SANITY_DATASET,
		apiVersion: '2025-10-01',
		visualEditing: {
			token: process.env.SANITY_API_READ_TOKEN,
			studioUrl: process.env.SANITY_STUDIO_URL,
			stega: false, // optional
		},
	},
	app: {
		head: {
			title: 'Eric Wu · Computer Scientist & Philosopher',
			link: [
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com',
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: '',
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Space+Mono:wght@400&display=swap',
				},
				// favicon served from /public/favicon.svg
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/favicon.svg',
				},
			],
			meta: [
				{
					name: 'application-name',
					content: process.env.SITE_NAME || 'Eric Wu',
				},
				{
					name: 'description',
					content:
						"Eric Wu's personal website. Computer scientist, philosopher, designer, and tea enthusiast.",
				},
				{
					property: 'og:title',
					content: 'Eric Wu · Computer Scientist & Philosopher',
				},
				{
					property: 'og:description',
					content:
						"Eric Wu's personal website. Computer scientist, philosopher, designer, and tea enthusiast.",
				},
				{
					property: 'og:url',
					content: 'https://ericwu.cv',
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					property: 'og:site_name',
					content: 'Eric Wu',
				},
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:title',
					content: 'Eric Wu · Computer Scientist & Philosopher',
				},
				{
					name: 'twitter:description',
					content:
						"Eric Wu's personal website. Computer scientist, philosopher, designer, and tea enthusiast.",
				},
			],
		},
	},
});
