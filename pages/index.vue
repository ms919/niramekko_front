<template>
	<div class="text-center display-col justify-space-around wrapper-height">
		<div>
			<div>
				<h2>笑って、笑わせて</h2>
				<h1 class="app-name-font">niramekko</h1>
				<h2>social niramekko game</h2>
			</div>
			<p>
				おもしろ動画とにらめっこ。サクッと気分を切り替えよう。
			</p>
		</div>
		<NuxtLink to="/modeSelect" class="btn lg-button btn-pink">PLAY</NuxtLink>
	</div>
</template>

<script>
export default {
	head() {
		return {
			meta: [
				{
					name: "google-site-verification",
					content: this.$config.search_console_content,
				},
			],
		};
	},
	mounted(){
		this.$store.dispatch("changeFooterFlg");
	},
	beforeDestroy(){
		this.$store.dispatch("changeFooterFlg");
	}
}
</script>

<style scoped>
p {
	font-size: 0.8rem;
	margin-top: 5rem;
}
</style>