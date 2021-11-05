<template>
	<div class="text-center display-col justify-space-around wrapper-height">
		<div>
			<h1 class="for_pc">笑って、笑わせて</h1>
			<h1 class="for_sp">笑って、<br/>笑わせて</h1>
			<h2>Social Niramekko Service</h2>
		</div>
		<NuxtLink to="/modeSelect" class="btn lg-button btn-pink">PLAY</NuxtLink>
	</div>
</template>
<style scoped>
.for_sp {
	display: none;
}
@media screen and (max-width: 425px) {
	.for_pc {
		display: none;
	}
	.for_sp {
		display: block;
	}
}
</style>