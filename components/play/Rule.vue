<template>
	<div class="text-center section-wrapper">
		<h3>ルール説明・注意点</h3>
		<div class="text-wrapper">
			<p v-html="text"></p>
		</div>
		<a @click="$store.dispatch('gotoNext')" class="btn sm-button btn-pink"
			>START</a
		>
	</div>
</template>

<script>
import fixed from "~/const/const.js";
export default {
	computed: {
		mode() {
			return this.$store.getters.mode;
		},
		text() {
			switch (this.mode) {
				case fixed.MODE.NORMAL:
					return (
							"texttexttexttexttexttext<br/>texttexttexttexttexttexttext"
					);
				case fixed.MODE.DOJYO:
					return (
						"hogehogehogehoge<br/>texttexttexttexttexttexttext"
					);
				case fixed.MODE.REVENGE:
					return (
						"fugafugafugafuga<br/>texttexttexttexttexttexttext"
					);
				default:
					""
			}
		},
	},
	mounted() {
		this.$store.dispatch("getItems");
	},
};
</script>

<style scoped>
.text-wrapper {
	margin: 2rem 0;
}
.section-wrapper {
	padding: 1.5rem 0;
}
</style>
