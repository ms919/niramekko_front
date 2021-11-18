export default {
	// backendとのパートバッティング回避 ※デプロイ時コメントアウト
	server: {
		port: 8080,
	},
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "niramekko",
		htmlAttrs: {
			lang: "ja",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["~/assets/css/main", "~/assets/css/reset", "~/assets/css/play"],

	env: {
		ga_id: process.env.GA_ID || "",
		google_client_id: process.env.GOOGLE_CLIENT_ID || "",
	},
	// publicRuntimeConfig: {
	//   ga_id: process.env.GA_ID,
	// },

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		[
			"@nuxtjs/google-fonts",
			{
				families: {
					"Yanone+Kaffeesatz": [400],
					"Noto+Sans+JP": [400, 700],
				},
			},
		],
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		"@nuxtjs/proxy",
		// "@nuxtjs/auth-next",
		"nuxt-fontawesome",
		[
			"@nuxtjs/google-gtag",
			{
				"google-gtag": {
					id: process.env.ga_id,
				},
			},
		],
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		proxy: true,
	},

	proxy: {
		// "/api": {
		// 	target: "https://niramekko-api.herokuapp.com",
		// },
		"/api": {
			target: "http://localhost:3000",
		},
	},

	fontawesome: {
		component: "fa",
	},

	build: {
		extend(config, ctx) {
			config.node = {
				fs: "empty",
			};
		},
	},
};
