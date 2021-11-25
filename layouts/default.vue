<template>
	<div>
		<header>
			<NuxtLink to="/" class="white-shadow title title-font"
				>niramekko</NuxtLink
			>
			<nav>
				<div v-if="loginFlg" ref="elRoot">
					<a @click="menuFlg = !menuFlg">
						<img :src="`${userImg}`" class="img-circle" />
					</a>
					<ul class="menu" v-show="menuFlg">
						<li><NuxtLink to="/user">profile</NuxtLink></li>
						<li><a @click="$store.dispatch('session/logout')">logout</a></li>
						<li><NuxtLink to="/modeSelect">play</NuxtLink></li>
						<li><NuxtLink to="/video">share video</NuxtLink></li>
					</ul>
				</div>
				<NuxtLink v-else to="/login" class="white-shadow">login</NuxtLink>
			</nav>
		</header>
		<nuxt />
		<footer></footer>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			menuFlg: false,
		};
	},
	computed: {
		...mapGetters({
			loginFlg: "session/loginFlg",
			userImg: "session/userImg",
		}),
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
<style>
.menu {
	padding: 1rem;
	background-color: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	margin-left: auto;
	position: absolute;
	right: 1rem;
	border-radius: 10px;
}
li {
	margin: 0.5rem 0;
}
li a {
	display: inline-block;
	width: 100%;
}
li a:hover {
	color: #e43965;
}
</style>
