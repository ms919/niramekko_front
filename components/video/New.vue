<template>
	<div class="display-col justify-center top-wrapper">
		<div class="text-center section-wrapper">
			<h3 class="white-shadow">Share Funny Videos</h3>
			<form class="display-row">
				<div class="form-group">
					<label class="white-shadow"
						>URL&nbsp;
						<span>{{ $t("new_video.caption") }}</span></label
					>
					<input id="url" type="text" :value="url" @input="inputUrl" />
				</div>
				<template v-if="canPlayFlg">
					<fa :icon="faCheckCircle" class="green is-checked-icon" />
					<fa
						:icon="faPaperPlane"
						@click="submit"
						class="white-shadow send-icon"
					/>
				</template>
				<template v-else>
					<fa :icon="faBan" class="red is-checked-icon" />
					<fa :icon="faPaperPlane" class="white-shadow send-icon disabled" />
				</template>
			</form>
		</div>
		<div class="tiktok-wrapper">
			<CommonTiktok />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
	faPaperPlane,
	faCheckCircle,
	faBan,
} from "@fortawesome/free-solid-svg-icons";

export default {
	data() {
		return {
			url: "",
		};
	},
	computed: {
		faPaperPlane: () => faPaperPlane,
		faCheckCircle: () => faCheckCircle,
		faBan: () => faBan,
		video_data() {
			return {
				video_user: this.url.match(/@[0-9A-Za-z_.]*/)[0].slice(1),
				data_video_id: this.url.match(/[0-9]*$/)[0],
			};
		},
		...mapGetters({
			currentItem: "video/currentItem",
			canPlayFlg: "video/canPlayFlg",
		}),
	},
	methods: {
		inputUrl() {
			this.$store.dispatch("video/changeCanPlayFlg", false);
			this.url = document.getElementById("url").value;
			// urlチェック
			this.checkUrl();
			if (this.url != "") {
				// currentItemにセット
				this.$store.dispatch("video/updateVideoUrl", this.video_data);
				this.$store.dispatch("video/checkVideo", window);
			}
		},
		checkUrl() {
			const pattern = /https:\/\/www.tiktok.com\/@[0-9A-Za-z_.]*\/video\/[0-9]*/;
			const sp_pattern = /https:\/\/vt.tiktok.com\/[0-9A-Za-z_.]*/;
			if (!pattern.test(this.url)) {
				if (sp_pattern.test(this.url)) {
					this.showFlashMsg("error", this.$t("error.url_unsupported"));
				} else {
					this.showFlashMsg("error", this.$t("error.wrong", { value: this.$t("url") }));
				}
				this.url = "";
			} else {
				this.url = this.url.match(pattern)[0];
			}
			document.getElementById("url").value = this.url;
		},
		submit() {
			this.$store.dispatch("video/changeCanPlayFlg", false);
			this.$axios
				.post("/api/v1/videos", this.video_data)
				.then(() => {
					this.url = "";
					this.showFlashMsg("success", this.$t("success.register", { value: this.$t("video") }));
				})
				.catch(() => {
					this.url = "";
					this.showFlashMsg("error", this.$t("error.register", { value: this.$t("this") + this.$t("video") }));
				});
		},
	},
	mounted() {
		if (!localStorage.getItem("loginFlg")) {
			this.needLoginMsg();
		} else {
			this.$axios
				.get("api/v1/videos/new")
				.then(() => {
					this.$store.dispatch("session/setLoginFlg");
				})
				.catch(() => {
					this.$store.dispatch("session/removeLoginFlg");
					this.showFlashMsg(
						"error",
						this.$t("error.session_expired")
					);
					this.$router.push("/login");
				});
		}
		this.$store.dispatch("video/changeNewVideoFlg", true);
	},
	beforeDestroy(){
		this.$store.dispatch("video/changeNewVideoFlg", false);
	}
};
</script>

<style scoped>
.send-icon {
	font-size: 1.5rem;
	display: block;
	cursor: pointer;
	margin-top: 2rem;
}
.is-checked-icon {
	display: block;
	margin: 2rem 0.5rem 0 -0.5rem;
}
.tiktok-wrapper {
	z-index: auto;
}
@media screen and (max-width: 425px) {
	.tiktok-wrapper {
		box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.25);
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
