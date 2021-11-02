<template>
	<div class="display-col justify-center top-wrapper">
		<div class="tiktok-wrapper">
			<component :is="currentComponent"></component>
			<div class="icon-wrapper">
				<fa :icon="faEyeSlash" transform="right-2" class="orange icon-size" />
				<br /><br />
				<fa
					:icon="faArrowCircleRight"
					@click="gotoNext"
					class="orange icon-size"
				/>
			</div>
			<PlayResult v-if="modalFlg" @close-modal="closeModal" />
		</div>
		<div class="contents-wrapper">
			<PlayFaceApi />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
	faEyeSlash,
	faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export default {
	data() {
		return {
			modalFlg: false,
		};
	},
	computed: {
		...mapGetters(["currentComponent", "itemsPointer"]),
		faEyeSlash: () => faEyeSlash,
		faArrowCircleRight: () => faArrowCircleRight,
	},
	methods: {
		gotoNext() {
			if (this.itemsPointer < 4) {
				this.$store.dispatch("gotoNext");
			} else {
				this.modalFlg = true;
			}
		},
		closeModal() {
			this.modalFlg = false;
		},
	},
};
</script>
