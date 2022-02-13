<template>
	<div class="text-center display-col justify-center wrapper-height">
		<div>
			<a
				@click="$store.dispatch('game/setMode', $fixed.MODE.NORMAL)"
				class="btn lg-button btn-pink"
				>{{ $t('modes.normal') }} mode</a
			>
			<p>{{ $t('mode_texts.normal') }}</p>
		</div>
		<div>
			<a
				@click="$store.dispatch('game/setMode', $fixed.MODE.DOJO)"
				class="btn lg-button btn-pink"
				>{{ $t('modes.dojo') }} mode</a
			>
			<p>{{ $t('mode_texts.dojo') }}</p>
		</div>
		<div v-if="revengeFlg">
			<a
				@click="$store.dispatch('game/setMode', $fixed.MODE.REVENGE)"
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
		...mapGetters('session', { revengeFlg: "revengeFlg" }),
	},
	mounted() {
		this.$store.dispatch("clearItem");
	},
};
</script>
