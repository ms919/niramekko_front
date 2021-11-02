<template>
	<div class="display-col justify-center top-wrapper">
		<div class="text-center section-wrapper">
			<h3 class="white-shadow">Share Funny Videos</h3>
			<form class="display-row">
				<div class="form-group">
					<label class="white-shadow"
						>URL&nbsp;
						<span>共有するtiktok動画のリンクを貼り付けてください。</span></label
					>
					<input type="text" v-model.lazy.trim="url" />
				</div>
				<fa
					:icon="faPaperPlane"
					@click="submit"
					class="white-shadow send-icon"
				/>
			</form>
		</div>
		<div class="tiktok-wrapper">
			<CommonTiktok />
		</div>
	</div>
</template>

<script>
// import { mapGetters } from "vuex";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default {
	computed: {
		// ...mapGetters(["currentComponent", "itemsPointer"]),
		faPaperPlane: () => faPaperPlane,
	},
	methods: {
		gotoNext() {
			if (this.itemsPointer < 4) {
				this.$store.dispatch("gotoNext");
			} else {
				this.modalFlg = true;
			}
		},
	},
};
</script>

<style scoped>
.send-icon {
	font-size: 1.5rem;
	display: block;
	cursor: pointer;
	margin-top: 2rem;
}
@media screen and (max-width: 425px) {
	.tiktok-wrapper {
		box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.25);
	}
	.section-wrapper {
		padding: 1.5rem 0;
	}
}
@media screen and (max-width: 320px) {
	.tiktok-wrapper {
		box-shadow: none;
		background-color: transparent;
		height: 563px;
	}
}
</style>
