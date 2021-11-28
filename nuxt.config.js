export default {
	// backendとのパートバッティング回避 ※デプロイ時コメントアウト
	// server: {
	// 	port: 8080,
	// },
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

	publicRuntimeConfig: {
		domain: process.env.API_DOMAIN,
		auth_url: process.env.AUTH_URL,
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~/plugins/flash-message.js", mode: "client" },
		{ src: "~/plugins/init.js" },
	],

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
		"nuxt-fontawesome",
		"@nuxtjs/google-gtag",
	],

	"google-gtag": {
		id: process.env.GA_ID,
	},

	axios: {
		proxy: true,
		credentials: true,
	},

	proxy: {
		"/api": {
			target: process.env.API_DOMAIN,
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
