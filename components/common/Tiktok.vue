<template>
	<div class="inner-wrapper" v-html="item"></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			defaultItem: "<div class='default-item'><p>NO<br/>VIDEO</p></div>",
		};
	},
	computed: {
		...mapGetters(["currentItem"]),
		item() {
			return this.currentItem != "" ? this.currentItem : this.defaultItem;
		},
	},
};
</script>

<style scoped>
.inner-wrapper {
	width: 324px;
	margin: 0 auto;
}
</style>
