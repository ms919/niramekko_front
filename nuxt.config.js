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
			prefix: "og: http://ogp.me/ns#",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "google-site-verification", content: process.env.SEARCH_CONSOLE_CONTENT },
			{ hid: "description", name: "description", content: "おもしろTikTok動画とにらめっこするゲーム" },
			{ name: "format-detection", content: "telephone=no,address=no,email=no" },
			{ hid: "og:site_name", property: "og:site_name", content: "niramekko" },
			{ hid: "og:type", property: "og:type", content: "website" },
			{
				hid: "og:url",
				property: "og:url",
				content: process.env.DOMAIN,
			},
			{ hid: "og:title", property: "og:title", content: "niramekko" },
			{
				hid: "og:description",
				property: "og:description",
				content: "おもしろTikTok動画とにらめっこするゲーム",
			},
			{
				hid: "og:image",
				property: "og:image",
				content: process.env.DOMAIN + "/ogp.png",
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:creator", content: "@sakkkkup" },
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, { rel: "canonical", href: process.env.DOMAIN }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["~/assets/css/main", "~/assets/css/reset", "~/assets/css/play"],

	publicRuntimeConfig: {
		domain: process.env.DOMAIN,
		auth_url: process.env.AUTH_URL,
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~/plugins/flash-message.js" },
		{ src: "~/plugins/init.js" },
		{ src: "~/plugins/call-flash-message.js" },
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
		// sitemapは必ずarrayの最後
		"@nuxtjs/sitemap"
	],

	"google-gtag": {
		id: process.env.GA_ID,
	},

	sitemap: {
		hostname: process.env.DOMAIN,
		exclude: ['/admin', '/callback', '/user', '/video']
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
