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
					<input id="url" type="text" :value="url" @input="inputUrl" />
				</div>
				<template v-if="sendFlg">
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
// import flashMsg from "~/common/flashMessage";

export default {
	data() {
		return {
			url: "",
			sendFlg: false,
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
		...mapGetters(["currentItem"]),
		can_send_flg() {
			if (this.currentItem == "") return;
		},
	},
	methods: {
		inputUrl() {
			this.sendFlg = false;
			this.url = document.getElementById("url").value;
			// urlチェック
			this.checkUrl();
			if (this.url != "") {
				// currentItemにセット
				this.$store.dispatch("updateVideoUrl", this.video_data);
				this.checkVideo();
			}
		},
		checkUrl() {
			const pattern = /https:\/\/www.tiktok.com\/@[0-9A-Za-z_.]*\/video\/[0-9]*/;
			if (!pattern.test(this.url)) {
				this.flashMessage.error({
					html:
						"<div class='flash-msg'><p>Error</p><p>URLが間違っています(T0T)</p></div>",
				});
				this.url = "";
			} else {
				this.url = this.url.match(pattern)[0];
			}
			document.getElementById("url").value = this.url;
		},
		checkVideo() {
			const pattern = /[0-9]*px/;
			let count = 0;
			const timerId = setInterval(() => {
				count++;
				const maxHeight = window
					.getComputedStyle(document.getElementsByTagName("iframe")[0])
					.getPropertyValue("max-height");
				this.sendFlg = pattern.test(maxHeight);
				if (this.sendFlg || count == 10) {
					clearInterval(timerId);
				}
			}, 1000);
		},
		submit() {
			this.$axios
				.post("/api/v1/videos", this.video_data)
				.then(() => {
					this.url = "";
					this.flashMessage.success({
						html:
							"<div class='flash-msg'><p>Success</p><p>ビデオを登録しました。</p></div>",
					});
				})
				.catch((error) => {
					console.log(error);
					this.flashMessage.error({
						html:
							"<div class='flash-msg'><p>Error</p><p>ビデオ登録に失敗しました。</p></div>",
					});
				});
		},
	},
	mounted() {
		if (!localStorage.getItem("loginFlg")) {
			this.flashMessage.error({
				html:
					"<div class='flash-msg'><p>Error</p><p>ログインしてください。</p></div>",
			});
			// flashMsg.showMsg("error", "ログインしてください。")
			this.$router.push("/login");
		} else {
			this.$axios
				.get("api/v1/videos/new")
				.then(() => {
					this.$store.dispatch("clearItem");
					this.$store.dispatch("session/setLoginFlg");
				})
				.catch(() => {
					this.$store.dispatch("session/removeLoginFlg");
					this.flashMessage.error({
						html:
							"<div class='flash-msg'><p>Error</p><p>セッションの有効期限が切れています。ログインしなおしてください。</p></div>",
					});
					this.$router.push("/login");
				});
		}
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
.is-checked-icon {
	display: block;
	margin: 2rem 0.5rem 0 -0.5rem;
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
