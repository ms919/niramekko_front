<template>
	<div class="text-center display-col justify-space-around wrapper-height">
		<div>
			<div>
				<h2>{{ $t('index.tagline') }}</h2>
				<h1 class="app-name-font">niramekko</h1>
				<h2>{{ $t('index.sub_tagline') }}</h2>
			</div>
			<p>
				{{ $t('index.caption') }}
			</p>
		</div>
		<NuxtLink to="/modeSelect" class="btn lg-button btn-pink">PLAY</NuxtLink>
	</div>
</template>

<script>
export default {
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
@media screen and (max-height: 834px) {
	.lg-button {
		margin-bottom: 3rem;
	}
}
</style>