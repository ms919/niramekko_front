<template>
<div class="display-col">
	<p>api接続確認用</p>
	<button @click="hello">hello</button>
	<div class="solid"></div>
	<p>session確認用</p>
	<button @click="createSession">create session</button>
	<button @click="getSession">get session</button>
	<button @click="destroySession">destroy session</button>
</div>
</template>
<script>
export default {
  methods: {
		// api接続確認用
		hello(){
			this.$axios
			.get("api/v1/hello")
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		},
		createSession(){
			// this.$axios
			// .get("api/v1/login")
			// .then((res) => {
			// 	console.log(res.data);
			// })
			// .catch((e) => {
			// 	console.log(e);
			// });
			window.location.href = "http://localhost:3000/api/v1/login";
		},
		getSession(){
			this.$axios
			.get("api/v1/sessions")
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		},
		destroySession(){
			this.$axios
			.get("api/v1/logout")
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
		},
	}
}
</script>
<style scoped>
button {
	margin: 1rem;
	cursor: pointer;
}
.solid {
	border-bottom: 2px solid black;
	width: 80%;
}
</style>