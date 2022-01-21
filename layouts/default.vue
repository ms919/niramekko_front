<template>
	<div>
		<header>
			<NuxtLink to="/" class="white-shadow header-app-name app-name-font"
				>niramekko</NuxtLink
			>
			<nav class="display-row">
				<NuxtLink to="/guide" class="white-shadow bar-item">guide</NuxtLink>
				<NuxtLink to="/contact" class="white-shadow bar-item">contact</NuxtLink>
				<a
					v-for="locale in availableLocales"
					:key="locale.code"
					@click="changeLocale(locale.code)"
					class="white-shadow bar-item"
				>
					{{ locale.name }}
				</a>
				<div v-if="loginFlg" ref="elRoot">
					<a @click="menuFlg = !menuFlg">
						<img v-if="userImg" :src="`${userImg}`" class="img-circle" />
						<fa-layers v-else full-width class="user-icon-wrapper">
							<fa :icon="faCircle" />
							<fa :icon="faUser" class="user-icon" />
						</fa-layers>
					</a>
					<ul class="menu" v-show="menuFlg">
						<li><NuxtLink to="/user">profile</NuxtLink></li>
						<li><NuxtLink to="/modeSelect">play game</NuxtLink></li>
						<li>
							<a @click="$store.dispatch('video/goToVideo', 'VideoNew')"
								>share video</a
							>
						</li>
						<li><a @click="$store.dispatch('session/logout')">logout</a></li>
					</ul>
				</div>
				<NuxtLink v-else to="/login" class="white-shadow">login</NuxtLink>
			</nav>
		</header>
		<div>
			<nuxt />
			<FlashMessage :position="'right bottom'"></FlashMessage>
		</div>
		<footer v-if="footerFlg">
			<NuxtLink to="/terms" class="footer-link white-shadow">{{ $t("terms") }}</NuxtLink>
			<NuxtLink to="/privacyPolicy" class="footer-link white-shadow">{{ $t("privacy_policy") }}</NuxtLink>
			<div class="copyright">
				<span class="white-shadow">© 2021 niramekko</span>
			</div>
		</footer>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import { faCircle, faUser } from "@fortawesome/free-solid-svg-icons";

export default {
	data() {
		return {
			menuFlg: false,
		};
	},
	computed: {
		...mapGetters(["footerFlg"]),
		...mapGetters({
			loginFlg: "session/loginFlg",
			userImg: "session/userImg",
		}),
		faCircle: () => faCircle,
		faUser: () => faUser,
		availableLocales() {
			return this.$i18n.locales.filter((x) => x.code !== this.$i18n.locale);
		},
	},
	methods: {
		changeLocale(locale) {
			this.$i18n.setLocaleCookie(locale);
			this.$router.go(0);
		}
	},
	mounted() {
		window.addEventListener(
			"click",
			(this._onBlurHandler = (event) => {
				if (!this.$refs.elRoot.contains(event.target)) {
					this.menuFlg = false;
				}
			})
		);
	},
	beforeDestroy() {
		window.removeEventListener("click", this._onBlurHandler);
	},
};
</script>

<style scoped>
header {
	position: sticky;
	top: 0;
	background-color: #44beef;
	width: 100%;
	height: 3rem;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	z-index: 998;
	display: flex;
	align-items: center;
	padding-top: 0.5rem;
}
header nav {
	margin: 0 0 0 auto;
	padding-right: 1.5rem;
}
.header-app-name {
	font-size: 2.2rem;
	padding: 1rem;
}
.bar-item {
	margin-right: 1.5rem;
}
.img-circle {
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	margin-bottom: 0.3rem;
}
.user-icon-wrapper {
	font-size: 2rem;
	margin-bottom: 0.3rem;
}
.user-icon {
	color: #ffffff;
	font-size: 1.2rem;
}
.menu {
	padding: 1rem;
	background-color: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	margin-left: auto;
	position: absolute;
	right: 1rem;
	border-radius: 10px;
}
footer {
	z-index: 997;
	position: fixed;
	bottom: 0;
	width: 100%;
	text-align: right;
	font-size: 0.6rem;
	padding: 0.5rem 1.5rem;
	background-color: #44beef;
	box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
}
.footer-link {
	margin: 0 0.3rem;
}
.copyright {
	display: inline;
	margin-left: 1.5rem;
}
@media screen and (max-width: 425px) and (min-height: 400px) {
	.menu {
		font-size: 2.5rem;
		width: 70%;
		height: 95vh;
		right: 0rem;
		padding: 2.5rem;
	}
	.menu li {
		margin: 4rem 0;
	}
}
</style>
