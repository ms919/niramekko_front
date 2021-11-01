<template>
	<div class="inner-wrapper" v-html="currentItem">
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["currentItem"]),
	},
};
</script>

<style scoped>
.inner-wrapper {
  width: 324px;
	margin: 0 auto;
}
</style>
