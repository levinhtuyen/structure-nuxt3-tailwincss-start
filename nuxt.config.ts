// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	modules: [
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@nuxt/ui",
		"@vueuse/nuxt",
		"nuxt-delay-hydration",
		"@nuxtjs/critters",
		"@nuxtjs/web-vitals",
	],
	vite: {
		plugins: [tailwindcss()],
	},
	css: ["~/assets/css/main.css"],
	webVitals: {
		provider: "log",
		debug: true, // debug enable metrics reporting on dev environments
		disabled: false,
	},
	critters: {
		config: {
			preload: "swap",
		},
	},
	delayHydration: {
		// enables nuxt-delay-hydration in dev mode for testing
		mode: "init",
		replayClick: true,
		include: ["/"],
	},
	vueuse: {
		ssrHandlers: true,
	},
	build: {
		transpile: [],
	},
});
