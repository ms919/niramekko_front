<template>
	<div class="display-col justify-center wrapper-height">
		<div class="display-row justify-between user_width">
			<div class="record user_div_style user_height">
				<div class="display-col record_right pink">
					<div class="record_right_width display-row justify-space-around">
						<div class="title">
							<fa :icon="faMeh" class="layer_icon gold" />
							{{ this.records.gold }}
						</div>
						<div class="title iron">{{ this.records.iron }}</div>
						<div class="title soil">{{ this.records.soil }}</div>
					</div>
					<div class="record_right_width display-row justify-center">
						<div class="title">{{ this.records.smile }}</div>
						<div class="title">{{ this.records.laugh }}</div>
					</div>
				</div>
			</div>
			<div class="profile user_div_style user_height">
				<p class="orange">name</p>
				{{ this.user.name }}
			</div>
		</div>
		<div class="user_width user_height notification user_div_style">
			Notification
			<div>{{ this.notifications }}</div>
		</div>
	</div>
</template>

<script>
import { faMeh } from "@fortawesome/free-solid-svg-icons";
export default {
	data() {
		return {
			point: 0,
			records: {
				gold: 0,
				iron: 0,
				soil: 0,
				smile: 0,
				laugh: 0,
			},
			notifications: {},
		};
	},
	computed: {
		faMeh: () => faMeh,
		user() {
			return this.$store.getters["session/user"];
		},
	},
	mounted() {
		this.$axios
			.get("api/v1/users")
			.then((res) => {
				this.$store.dispatch("session/setUser", res.data);
			})
			.catch((e) => {
				console.log(e);
				this.$router.push("/login");
			});
	},
};
</script>

<style scoped>
.user_width {
	width: 70%;
}
.user_height {
	height: 40vh;
}
.user_div_style {
	background: rgba(255, 255, 255, 0.6);
	border-radius: 50px;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	padding: 2rem;
	margin: 0.5rem 0;
}
.record_right {
	width: 50%;
	margin-left: auto;
}
.record {
	width: 59%;
}
.record_right_width {
	width: 100%;
}
.profile {
	width: 39%;
}
.hoge {
	background-color: chartreuse;
	/* width: 100%; */
}
.title {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	text-align: center;
	line-height: 4rem;
}
.layer_icon {
	box-shadow: 0 0 rgba(0, 0, 0, 0.5);
	/* color: unset; */
	/* background-clip: content-box; */
	/* -webkit-background-clip: border-box; */
}
.gold {
	background: linear-gradient(
		45deg,
		#b67b03 0%,
		#daaf08 45%,
		#f7e8d6 70%,
		#daaf08 85%,
		#b67b03 90% 100%
	);
}
.iron {
	background: linear-gradient(
		45deg,
		#757575 0%,
		#b8b8b8 45%,
		#e7e7e7 70%,
		#b8b8b8 85%,
		#757575 90% 100%
	);
}
.soil {
	background: linear-gradient(
		45deg,
		#7e5737 0%,
		#c0a795 45%,
		#eae1db 70%,
		#c0a795 85%,
		#7e5737 90% 100%
	);
}
</style>
