<template>
	<div>
		<header>
			<NuxtLink to="/" class="white-shadow title title-font"
				>niramekko</NuxtLink
			>
			<nav>
				<a v-if="loginFlg" @click="logout" class="white-shadow"
					>logout</a>
				<NuxtLink v-else to="/login" class="white-shadow">login</NuxtLink>
			</nav>
		</header>
		<nuxt />
		<footer></footer>
	</div>
</template>
<script>
export default {
	computed: {
		loginFlg() {
			return this.$store.getters.loginFlg
		},
	},
	methods:{
		logout(){
			this.$axios
				.get("api/v1/logout")
				.then((res) => {
					console.log(res.data);
          localStorage.removeItem("loginFlg");
					this.$store.dispatch("reloadLoginFlg");
					this.$router.push("/");
				})
				.catch((e) => console.log(e));
		}
	}
};
</script>
