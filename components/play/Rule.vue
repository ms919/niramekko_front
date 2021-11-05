<template>
	<div class="text-center section-wrapper">
		<h3>ルール説明・注意点</h3>
		<div class="text-wrapper">
			<p>
				texttexttexttexttexttext<br />texttexttexttexttexttexttext
			</p>
			<p>
				texttexttexttexttexttext<br />texttexttexttexttexttexttext
			</p>
			<p>
				texttexttexttexttexttext<br />texttexttexttexttexttexttext
			</p>
			<p>
				texttexttexttexttexttext<br />texttexttexttexttexttexttext
			</p>
		</div>
		<a @click="$store.dispatch('gotoNext')" class="btn sm-button btn-pink">START</a>
	</div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getItems");
  }
}
</script>

<style scoped>
.text-wrapper {
	margin: 2rem 0;
}
.section-wrapper {
	padding: 1.5rem 0;
}
</style>
