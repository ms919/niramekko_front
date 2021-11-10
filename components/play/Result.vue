<template>
	<transition appear>
		<div @click="closeModal" class="overlay">
			<div class="window">
				<div class="content yellow-green display-col justify-center">
					<p class="result-text">SCORE {{ score }}</p>
					<p>称号</p>
					<p class="result-text">{{ title.name }}</p>
					<div class="icons-wrapper">
						<NuxtLink to="/modeSelect">
							<fa-layers
								full-width
								class="icon"
								><fa :icon="faRedoAlt" class="icon pink" /><fa
									:icon="faPlay"
									transform="shrink-8.7 right-1.2 down-0.5"
									class="pink"
							/></fa-layers>
						</NuxtLink>
						<NuxtLink to="/">
							<fa :icon="faHome" class="orange icon mrl-2" />
						</NuxtLink>
						<fa :icon="faTwitter" @click.stop="openTweet" class="light-blue icon" />
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { faHome, faRedoAlt, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { mapGetters } from "vuex";
export default {
	props: {
		score: { type: Number },
	},
	computed: {
		tweetContent() {
			const url = "https://twitter.com/intent/tweet?url=https://niramekko.app";
			const text =
				this.score != null
					? `%0a&text=SCORE:${this.score}【${this.title.name}】%0a%0a`
					: "&text=";
			const hashtags = "&hashtags=niramekko,tiktok,にらめっこ,お笑い";
			return `${url}${text}${hashtags}`;
		},
		faRedoAlt: () => faRedoAlt,
		faPlay: () => faPlay,
		faHome: () => faHome,
		faTwitter: () => faTwitter,
		...mapGetters(["title"]),
	},
	methods: {
		closeModal() {
			this.$store.dispatch("changeModalFlg");
		},
		openTweet() {
			window.open(this.tweetContent, '_blank');
		},
	},
};
</script>

<style scoped>
.overlay {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.15);
}
.window {
	height: 400px;
	width: 40%;
	overflow: hidden;
	background-color: #ffffff;
	border-radius: 20px;
}
.content {
	text-align: center;
	height: 90%;
}
.mrl-2 {
	margin: 0 2rem;
}
.result-text {
	font-size: 2rem;
	font-weight: bold;
}
.icons-wrapper {
	position: relative;
	bottom: -3rem;
}
@media screen and (max-width: 1366px) {
	.window {
		width: 60%;
	}
}
@media screen and (max-width: 425px) {
	.window {
		width: 90%;
	}
}
</style>
