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
			],
			meta: [
				{
					name: 'application-name',
					content: process.env.SITE_NAME || 'Eric Wu',
				},
				{
					property: 'og:site_name',
					content: process.env.SITE_NAME || 'Eric Wu',
				},
				{
					property: 'og:title',
					content: process.env.SITE_NAME || 'Eric Wu',
				},
				{
					name: 'twitter:title',
					content: process.env.SITE_NAME || 'Eric Wu',
				},
			],
		},
	},
});
