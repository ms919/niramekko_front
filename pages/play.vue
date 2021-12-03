<template>
	<div class="display-col justify-center top-wrapper">
		<div class="tiktok-wrapper">
			<component :is="currentComponent"></component>
			<div class="icon-wrapper">
				<template v-if="startFlg || gameFinFlg">
					<fa :icon="faEyeSlash" transform="right-2" class="orange icon" />
					<br /><br />
					<fa
						:icon="faArrowCircleRight"
						@click="gotoNext"
						class="orange icon"
					/>
				</template>
				<template v-else>
					<fa
						:icon="faEyeSlash"
						transform="right-2"
						class="orange icon disabled"
					/>
					<br /><br />
					<fa :icon="faArrowCircleRight" class="orange icon disabled" />
				</template>
			</div>
			<PlayResult v-if="modalFlg" :score="$refs.faceApi.score" />
		</div>
		<div class="contents-wrapper">
			<PlayFaceApi ref="faceApi" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import fixed from "~/const/const.js";
import {
	faEyeSlash,
	faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export default {
	computed: {
		...mapGetters([
			"currentComponent",
			"itemsPointer",
			"itemsLength",
			"startFlg",
			"modalFlg",
			"gameFinFlg",
			"gameOverFlg",
			"mode",
		]),
		faEyeSlash: () => faEyeSlash,
		faArrowCircleRight: () => faArrowCircleRight,
	},
	methods: {
		gotoNext() {
			if (this.mode != fixed.MODE.NORMAL) {
				if (this.gameOverFlg) {
					this.$store.dispatch("changeModalFlg");
					return;
				} else {
					this.$refs.faceApi.AddScore();
				}
			}
			if (this.itemsPointer < this.itemsLength - 1) {
				this.$store.dispatch("gotoNext", this.$refs.faceApi.score);
			} else {
				if (!this.gameFinFlg) {
					this.$store.dispatch("afterGame", this.$refs.faceApi.score);
				}
				this.$store.dispatch("changeModalFlg");
			}
		},
	},
};
</script>
