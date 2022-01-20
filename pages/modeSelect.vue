<template>
	<div class="text-center display-col justify-center wrapper-height">
		<div>
			<a
				@click="$store.dispatch('setMode', normal)"
				class="btn lg-button btn-pink"
				>{{ $t('modes.normal') }} mode</a
			>
			<p>{{ $t('mode_texts.normal') }}</p>
		</div>
		<div>
			<a
				@click="$store.dispatch('setMode', dojo)"
				class="btn lg-button btn-pink"
				>{{ $t('modes.dojo') }} mode</a
			>
			<p>{{ $t('mode_texts.dojo') }}</p>
		</div>
		<div v-if="revengeFlg">
			<a
				@click="$store.dispatch('setMode', revenge)"
				class="btn lg-button btn-pink"
				>{{ $t('modes.revenge') }} mode</a
			>
			<p>{{ $t('mode_texts.revenge') }}</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters({
			revengeFlg: "session/revengeFlg",
		}),
	},
	mounted() {
		this.normal = this.$fixed.MODE.NORMAL;
		this.dojo = this.$fixed.MODE.DOJO;
		this.revenge = this.$fixed.MODE.REVENGE;
		this.$store.dispatch("clearItem");
	},
};
</script>
