<template>
	<div class="display-col justify-center wrapper-height">
		<div class="user-upper justify-between user-width">
			<div class="display-row record user-div-style">
				<p class="record-left pink text-center">
					<span class="score-font">{{ total_score }}</span><br />score
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
			<div class="display-row profile user-div-style">
				<div>
					<p class="orange">name</p>
					{{ this.user.name }}
				</div>
				<fa :icon="faCog" class="orange cog" />
			</div>
		</div>
		<div class="user-width notification user-div-style">
			<p class="orange">notification</p>
			<template v-if="notifications">
				<div class="display-row" v-for="item in this.notifications" :key="item.message">
					<div class="notice">
						<p>{{ item.message }}</p>
					</div>
					<span @click="noticeDelete" class="notice-delete">×</span>
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
} from "@fortawesome/free-solid-svg-icons";
export default {
	computed: {
		faMeh: () => faMeh,
		faSmile: () => faSmile,
		faSmileBeam: () => faSmileBeam,
		faLaughBeam: () => faLaughBeam,
		faLaughSquint: () => faLaughSquint,
		faCog: () => faCog,
		...mapGetters({
			user: "session/user",
			records: "session/records",
			total_score: "session/total_score",
			notifications: "session/notifications"
		}),
	},
	methods: {
		noticeDelete() {
			console.log("noticeDelete");
		},
	},
	mounted() {
		this.$axios
			.get("api/v1/user")
			.then((res) => {
				this.$store.dispatch("session/setUserInfo", res.data);
			})
			.catch(() => {
				this.flashMessage.error({
					html:
						"<div class='flash-msg'><p>Error</p><p>ログインしてください。</p></div>",
				});
				this.$router.push("/login");
			});
	},
};
</script>

<style scoped src="@/assets/css/user.css"></style>
