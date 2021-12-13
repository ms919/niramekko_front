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
			<p>最新ベストに挑むモード</p>
		</div>
		<div v-if="revengeFlg">
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
import { mapGetters } from "vuex";
import fixed from "~/const/const.js";
export default {
	computed: {
    ...mapGetters({
			revengeFlg: "session/revengeFlg",
		}),
	},
	mounted() {
		this.normal = fixed.MODE.NORMAL;
		this.dojyo = fixed.MODE.DOJYO;
		this.revenge = fixed.MODE.REVENGE;
		this.$store.dispatch("clearItem");
	},
};
</script>
