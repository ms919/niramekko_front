<template>
	<div class="user-wrapper">
		<div class="display-row record user-div-style">
			<p class="record-left pink text-center">
				<span class="score-font">{{ totalScore }}</span><br />score
			</p>
			<div class="display-col justify-center record-right pink">
				<div class="record-right-width display-row justify-space-around">
					<div class="title gold">
						<fa :icon="faMeh" class="layer-icon" />
						<p>{{ this.records.gold }}</p>
					</div>
					<div class="title iron">
						<fa :icon="faSmile" class="layer-icon" />
						<p>{{ this.records.iron }}</p>
					</div>
					<div class="title soil">
						<fa :icon="faSmileBeam" class="layer-icon" />
						<p>{{ this.records.soil }}</p>
					</div>
				</div>
				<br />
				<div class="record-right-width display-row justify-space-around">
					<div class="title bg-orange">
						<fa :icon="faLaughBeam" class="layer-icon" />
						<p>{{ this.records.smile }}</p>
					</div>
					<div class="title bg-orange">
						<fa :icon="faLaughSquint" class="layer-icon" />
						<p>{{ this.records.laugh }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="user-right-wrapper">
			<div class="display-row user-div-style">
				<div>
					<p class="orange">name</p>
					{{ this.user.name }}
				</div>
				<fa
					:icon="faCog"
					@click="changeComponent('UserSettings')"
					class="user-icon cog"
				/>
			</div>
			<div class="user-div-style display-row justify-between">
				<p class="orange">video</p>
				<div class="display-row justify-between video-icons">
					<fa
						:icon="faListUl"
						@click="$store.dispatch('video/goToVideo', 'Video')"
						class="user-icon"
					/>
					<fa
						:icon="faPlus"
						@click="$store.dispatch('video/goToVideo', 'VideoNew')"
						class="user-icon"
					/>
				</div>
			</div>
		</div>
		<div class="notification user-div-style">
			<p class="orange">notification</p>
			<template v-if="notifications">
				<div class="display-row" v-for="item in notifications" :key="item.id">
					<div class="notice-item">
						<p>{{ item.message }}</p>
					</div>
					<span @click="noticeDelete(item.id)" class="notice-delete">×</span>
				</div>
			</template>
			<div v-else>
				<p>There aren't notifications ...</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
	faMeh,
	faSmile,
	faSmileBeam,
	faLaughBeam,
	faLaughSquint,
	faCog,
	faListUl,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default {
	computed: {
		faMeh: () => faMeh,
		faSmile: () => faSmile,
		faSmileBeam: () => faSmileBeam,
		faLaughBeam: () => faLaughBeam,
		faLaughSquint: () => faLaughSquint,
		faCog: () => faCog,
		faListUl: () => faListUl,
		faPlus: () => faPlus,
		...mapGetters('session', {
			user: "user",
			records: "records",
			totalScore: "totalScore",
			notifications: "notifications",
		}),
	},
	methods: {
		noticeDelete(id) {
			this.$axios.patch(`api/v1/user_notifications/${id}`).then((res) => {
				this.$store.dispatch("session/setNotifications", res.data);
			});
		},
		changeComponent(component) {
			this.$emit("changeComponent", component);
		},
	},
	mounted() {
		this.$axios
			.get("api/v1/user")
			.then((res) => {
				this.$store.dispatch("session/setUserInfo", res.data);
			})
			.catch((e) => {
				console.log(e);
				this.needLoginMsg();
			});
	},
};
</script>

<style scoped src="@/assets/css/user.css"></style>
