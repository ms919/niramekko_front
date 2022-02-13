<template>
	<div class="inner-wrapper" v-html="currentItem"></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	head() {
		const flg = this.itemsPointer % 2 == 0;
		return {
			script: [
				{
					type: "text/javascript",
					src: "https://www.tiktok.com/embed.js",
					async: flg,
					body: flg,
				},
			],
		};
	},
	computed: {
		...mapGetters('video', {
			itemsPointer: "itemsPointer",
			currentItem: "currentItem",
		}),
	},
};
</script>

<style scoped>
.inner-wrapper {
	width: 324px;
	margin: 0 auto;
}
</style>
