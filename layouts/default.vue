<template>
	<div>
		<header>
			<NuxtLink to="/" class="white-shadow app-name app-name-font"
				>niramekko</NuxtLink
			>
			<nav class="display-row">
				<NuxtLink to="/guide" class="white-shadow">guide</NuxtLink>
				<NuxtLink to="/contact" class="white-shadow bar-item">contact</NuxtLink>
				<div v-if="loginFlg" ref="elRoot">
					<a @click="menuFlg = !menuFlg">
						<img v-if="userImg" :src="`${userImg}`" class="img-circle" />
						<fa-layers v-else full-width class="user-icon-wrapper">
							<fa :icon="faCircle" />
							<fa :icon="faUser" class="user-icon"/>
						</fa-layers>
					</a>
					<ul class="menu" v-show="menuFlg">
						<li><NuxtLink to="/user">profile</NuxtLink></li>
						<li><NuxtLink to="/modeSelect">play game</NuxtLink></li>
						<li><a @click="$store.dispatch('goToVideo', 'VideoNew')">share video</a></li>
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
			<NuxtLink to="/terms" class="footer-link white-shadow">利用規約</NuxtLink>
			<NuxtLink to="/privacyPolicy" class="footer-link white-shadow">プライバシーポリシー</NuxtLink>
			<div class="copyright"><span class="white-shadow">© 2021 niramekko</span></div>
		</footer>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import { faCircle,faUser } from "@fortawesome/free-solid-svg-icons";

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
.bar-item {
	margin: 0 1.5rem;
}
.user-icon-wrapper {
	font-size: 2rem;
	margin-bottom: 0.3rem;
}
.user-icon {
	color: #ffffff;
	font-size: 1.2rem;
}
</style>