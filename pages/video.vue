<template>
	<div>
		<component :is="currentComponent" :show-mode="showMode" :update-flg.sync="updateFlg"></component>
		<div class="video-icon-wrapper">
			<fa
				:icon="faEyeSlash"
				@click="changeComponent($fixed.VIDEO_SHOW_MODE.HIDDEN)"
				class="video-icon btn btn-yellow-green"
			/>
			<fa
				:icon="faListUl"
				@click="changeComponent($fixed.VIDEO_SHOW_MODE.INDEX)"
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
	data(){
		return {
			showMode: null,
			updateFlg: false,
		}
	},
	computed: {
		faListUl: () => faListUl,
		faPlus: () => faPlus,
		faEyeSlash: () => faEyeSlash,
		...mapGetters(["currentComponent"]),
	},
	methods: {
		changeComponent(mode){
			this.updateFlg = this.showMode != mode || this.currentComponent == "VideoNew";
			this.showMode = mode;
			this.$store.dispatch('changeCurrentComponent', 'VideoTable');
		}
	},
	mounted() {
		if (!localStorage.getItem("loginFlg")) {
			this.needLoginMsg();
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
