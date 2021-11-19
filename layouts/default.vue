<template>
	<div>
		<header>
			<NuxtLink to="/" class="white-shadow title title-font"
				>niramekko</NuxtLink
			>
			<nav>
				<a
					v-if="loginFlg"
					@click="$store.dispatch('session/logout')"
					class="white-shadow"
					>logout</a
				>
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
			return this.$store.getters["session/loginFlg"];
		},
	},
	// methods:{
	// 	logout(){
	// 		this.$axios
	// 			.get("api/v1/logout")
	// 			.then(() => {
	// 				this.$store.dispatch("session/removeLoginFlg");
	// 			})
	// 			.catch((e) => console.log(e));
	// 	}
	// }
};
</script>
