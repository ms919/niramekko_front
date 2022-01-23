<template>
	<transition appear>
		<div @click="closeModal" class="overlay">
			<div class="window">
				<div class="content yellow-green display-col justify-center">
					<template v-if="!gameOverFlg">
						<p class="result-text">SCORE {{ score }}</p>
						<p>{{ $t("title") }}</p>
						<p class="result-text">{{ title.name }}</p>
					</template>
					<template v-else>
						<p class="result-text">GAME OVER</p>
						<fa :icon="faSkull" /><fa :icon="faBone" />
						<p>SCORE {{ score }}</p>
						<p class="gameOver-title-text">{{ $t("title") }}&nbsp;{{ title.name }}</p>
					</template>
					<div class="icons-wrapper">
						<NuxtLink to="/modeSelect">
							<fa-layers full-width class="play-icon"
								><fa :icon="faRedoAlt" class="play-icon pink" /><fa
									:icon="faPlay"
									transform="shrink-8.7 right-1.2 down-0.5"
									class="pink"
							/></fa-layers>
						</NuxtLink>
						<NuxtLink to="/">
							<fa :icon="faHome" class="orange play-icon mrl-2" />
						</NuxtLink>
						<fa
							:icon="faTwitter"
							@click.stop="openTweet"
							class="light-blue play-icon"
						/>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import {
	faHome,
	faRedoAlt,
	faPlay,
	faSkull,
	faBone,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { mapGetters } from "vuex";
export default {
	props: {
		score: { type: Number },
	},
	computed: {
		tweetContent() {
			const url = `https://twitter.com/intent/tweet?url=${this.$config.domain}`;
			const text =
				this.score != null
					? `%0a&text=SCORE:${this.score}【${this.title.name}】%0a${this.title.tweet_text}%0a%0a`
					: "&text=";
			const hashtags = `&hashtags=niramekko,TikTok,${this.$t("niramekko")},${this.$t("comedy")}`;
			return `${url}${text}${hashtags}`;
		},
		faRedoAlt: () => faRedoAlt,
		faPlay: () => faPlay,
		faHome: () => faHome,
		faTwitter: () => faTwitter,
		faSkull: () => faSkull,
		faBone: () => faBone,
		...mapGetters({ gameOverFlg: "game/gameOverFlg", title: "game/title" }),
	},
	methods: {
		closeModal() {
			this.$store.dispatch("changeFlg", { target: "game/modalFlg", flg: false });
		},
		openTweet() {
			window.open(this.tweetContent, "_blank");
		},
	},
};
</script>

<style scoped src="@/assets/css/play.css"></style>
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
	height: 50%;
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
		height: 40%;
	}
	.gameOver-title-text {
		font-size: 1.5rem;
	}
}
</style>
