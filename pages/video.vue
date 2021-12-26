<template>
	<div>
		<component :is="currentComponent"></component>
		<div class="video-icon-wrapper">
			<fa
				:icon="faEyeSlash"
				@click="$store.dispatch('changeCurrentComponent', 'VideoHidden')"
				class="video-icon btn btn-yellow-green"
			/>
			<fa
				:icon="faListUl"
				@click="$store.dispatch('changeCurrentComponent', 'Video')"
				class="video-icon btn btn-yellow-green"
			/>
			<fa
				:icon="faPlus"
				@click="$store.dispatch('changeCurrentComponent', 'VideoNew')"
				class="video-icon btn btn-yellow-green"
			/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
	faListUl,
	faPlus,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
export default {
	computed: {
		faListUl: () => faListUl,
		faPlus: () => faPlus,
		faEyeSlash: () => faEyeSlash,
		...mapGetters(["currentComponent"]),
	},
	mounted() {
		if (!localStorage.getItem("loginFlg")) {
			this.flashMessage.error({
				html:
					"<div class='flash-msg'><p>Error</p><p>ログインしてください。</p></div>",
			});
			this.$router.push("/login");
		}
		if (this.currentComponent == "PlayRule") {
			this.$store.dispatch("changeCurrentComponent", "VideoNew");
		}
	},
	beforeDestroy() {
		this.$store.dispatch("clearItem");
	},
};
</script>

<style scoped>
.video-icon-wrapper {
	margin: 0 auto;
	margin-right: 2rem;
	display: flex;
	width: 16%;
	position: sticky;
	bottom: 1rem;
	z-index: 3;
}
.video-icon {
	font-size: 2.5rem;
	margin: 0 0.5rem;
	border-radius: 30px;
	padding: 0.5rem 0.5rem;
	margin: 0.5rem;
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
}
@media screen and (max-width: 800px) {
	.video-icon-wrapper {
		flex-direction: column;
		width: 12%;
		bottom: 3rem;
	}
}
</style>
