<template>
	<div class="text-center display-col justify-center wrapper-height">
		<div>
			<a
				@click="$store.dispatch('setMode', normal)"
				class="btn lg-button btn-pink"
				>normal mode</a
			>
			<p>5つの動画を見て最終スコアを競うモード</p>
		</div>
		<div>
			<a
				@click="$store.dispatch('setMode', dojyo)"
				class="btn lg-button btn-pink"
				>道場破りmode</a
			>
			<p>最新ベスト5に挑むモード</p>
		</div>
		<div v-if="loginFlg">
			<a
				@click="$store.dispatch('setMode', revenge)"
				class="btn lg-button btn-pink"
				>リベンジmode</a
			>
			<p>過去に笑ってしまった動画にリベンジするモード</p>
		</div>
	</div>
</template>

<script>
import fixed from "~/const/const.js";
export default {
	computed: {
		loginFlg() {
			return this.$store.getters["session/loginFlg"];
		},
	},
	mounted() {
		this.normal = fixed.MODE.NORMAL;
		this.dojyo = fixed.MODE.DOJYO;
		this.revenge = fixed.MODE.REVENGE;
		this.$store.dispatch("clearItem");
	},
};
</script>
