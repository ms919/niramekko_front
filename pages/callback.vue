<template>
</template>
<script>
export default {
  created(){
    this.$axios
			.post("api/v1/login", {token: this.$route.query.token})
			.then(() => {
        this.$router.push("/user");
			})
			.catch(() => {
				this.needLoginMsg();
			});
  }
}
</script>