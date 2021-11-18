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
					<input id="url" type="text" v-model="url" @focusout="focusoutUrl" />
				</div>
				<fa
					:icon="faPaperPlane"
					@click="submit"
					class="white-shadow send-icon"
				/>
			</form>
		</div>
		<div class="tiktok-wrapper">
			<CommonTiktok />
		</div>
	</div>
</template>

<script>
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default {
	data() {
		return {
			url: "",
		};
	},
	computed: {
		faPaperPlane: () => faPaperPlane,
		video_data() {
			return {
				video_user: this.url.match(/@[0-9A-Za-z_.]*/)[0],
				data_video_id: this.url.match(/[0-9]*$/)[0],
			};
		},
	},
	methods: {
		focusoutUrl() {
			// urlチェック
			this.checkUrl();
			if (this.url != "") {
				// currentItemにセット
				this.$store.dispatch("updateVideoUrl", this.video_data);
			}
		},
		checkUrl() {
			const pattern = /https:\/\/www.tiktok.com\/@[0-9A-Za-z_.]*\/video\/[0-9]*/;
			if (!pattern.test(this.url)) {
				confirm("urlが間違っています(ToT)");
				this.url = "";
			} else {
				this.url = this.url.match(pattern)[0];
			}
			document.getElementById("url").value = this.url;
		},
		submit() {
			this.$axios
				.post("/api/v1/videos", this.video_data)
				.then((res) => {
					this.url = "";
					confirm("登録しました");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	mounted() {
		if (!this.$store.getters.loginFlg) {
			this.$router.push("/login");
		} else {
			this.$store.dispatch("clearItem");
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
