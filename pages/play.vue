<template>
	<div class="display-col justify-center top-wrapper">
		<div class="tiktok-wrapper">
			<p v-if="currentComponent == 'CommonTiktok'" class="pointer-num orange">
				{{ itemsPointer + 1 }}/{{ itemsLength }}
			</p>
			<component :is="currentComponent" @gotoNext="gotoNext"></component>
			<div class="play-icon-wrapper">
				<template v-if="startFlg || gameFinFlg">
					<template v-if="loginFlg">
						<fa
							:icon="faEyeSlash"
							@click="$store.dispatch('game/changeHiddenFlg')"
							transform="right-2"
							class="orange play-icon"
						/>
					</template>
					<br /><br />
					<fa
						:icon="faArrowCircleRight"
						@click="gotoNext"
						class="orange play-icon"
					/>
				</template>
				<template v-else>
					<template v-if="loginFlg">
						<fa
							:icon="faEyeSlash"
							transform="right-2"
							class="orange play-icon disabled"
						/>
					</template>
					<br /><br />
					<fa :icon="faArrowCircleRight" class="orange play-icon disabled" />
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
import {
	faEyeSlash,
	faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export default {
	computed: {
		...mapGetters(["currentComponent"]),
		...mapGetters('session', { loginFlg: "loginFlg" }),
		...mapGetters('video', {
			itemsPointer: "itemsPointer",
			itemsLength: "itemsLength",
		}),
		...mapGetters('game', {
			mode: "mode",
			hiddenFlg: "hiddenFlg",
			startFlg: "startFlg",
			gameOverFlg: "gameOverFlg",
			gameFinFlg: "gameFinFlg",
			modalFlg: "modalFlg",
		}),
		faEyeSlash: () => faEyeSlash,
		faArrowCircleRight: () => faArrowCircleRight,
		firstItemFlg() { return this.itemsPointer < 0 },
		lastItemFlg() { return this.itemsPointer == this.itemsLength - 1 }
	},
	methods: {
		gotoNext() {
			if (this.mode != this.$fixed.MODE.NORMAL && !this.firstItemFlg && !this.lastItemFlg) {
				if (this.gameOverFlg) {
					this.$store.dispatch("changeFlg", { target: "game/modalFlg", flg: true });
					return;
				} else {
					this.$refs.faceApi.AddScore();
				}
			}
			if (!this.lastItemFlg) {
				this.$store.dispatch("game/gotoNext", {
					score: this.$refs.faceApi.score,
					window: window,
				});
			} else {
				if (!this.gameFinFlg) {
					this.$store.dispatch("game/afterGame", this.$refs.faceApi.score);
				}
				this.$store.dispatch("changeFlg", { target: "game/modalFlg", flg: true });
			}
		},
	},
	beforeDestroy() {
		this.$store.dispatch("clearItem");
	},
};
</script>

<style scoped src="@/assets/css/play.css"></style>
<style scoped>
@media screen and (max-height: 800px) {
	.top-wrapper {
		position: relative;
	}
}
</style>
