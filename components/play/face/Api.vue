<template>
	<div class="display-row justify-center wrapper">
		<div class="display-row">
			<div class="display-col justify-space-around emotions-wrapper">
				<fa :icon="faSadTear" class="pink" />
				<fa :icon="faLaughSquint" class="pink" />
				<fa :icon="faAngry" class="pink" />
				<fa :icon="faSurprise" class="pink" />
				<fa :icon="faDizzy" class="pink" />
			</div>
			<PlayFaceChart :chart-data="datacollection" />
		</div>
		<div class="right-wrapper display-col justify-center">
			<p class="score">SCORE {{ score }}</p>
			<div>
				<video id="video" @play="onPlay" playsinline autoplay muted></video>
				<canvas id="canvas"></canvas>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import fixed from "~/const/const.js";
import * as faceapi from "face-api.js";
import {
	faLaughSquint,
	faSadTear,
	faAngry,
	faSurprise,
	faDizzy,
} from "@fortawesome/free-regular-svg-icons";
export default {
	data() {
		return {
			datacollection: { labels: [], datasets: [] },
			score: 0,
		};
	},
	computed: {
		faSadTear: () => faSadTear,
		faLaughSquint: () => faLaughSquint,
		faAngry: () => faAngry,
		faSurprise: () => faSurprise,
		faDizzy: () => faDizzy,
		...mapGetters(["currentComponent", "startFlg", "mode", "gameOverFlg"]),
	},
	methods: {
		onPlay() {
			const video = document.getElementById("video");
			const canvas = document.getElementById("canvas");

			setTimeout(() => {
				canvas.width = video.clientWidth;
				canvas.height = video.clientHeight;
			}, 1000);

			setInterval(async () => {
				// ウェブカメラの映像から顔データを取得
				const detections = await faceapi
					.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceLandmarks()
					.withFaceExpressions();
				if (detections == undefined) return;

				// 顔データをリサイズ
				const resizedDetections = faceapi.resizeResults(detections, {
					width: video.clientWidth,
					height: video.clientHeight,
				});

				// キャンバスに描画
				canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
				faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

				// 取得した表情データを渡してグラフやスコア計算をアップデート
				this.updateData(detections.expressions);

				// コンポーネントが変わり、video再生が始まっていたらstartFlgをtrueにする(ボタン制御)
				if (
					document.activeElement.tagName == "IFRAME" &&
					!this.startFlg &&
					!this.gameOverFlg
				)
					this.$store.dispatch("changeStartFlg");

			}, 500);
		},
		updateData(expressions) {
			this.datacollection = {
				labels: ["sad", "happy", "angry", "surprised", "disgusted"],
				datasets: [
					{
						backgroundColor: "#e43965",
						data: [
							expressions.sad,
							expressions.happy * fixed.HAPPY_MULTIPLICATION,
							expressions.angry,
							expressions.surprised,
							expressions.disgusted + expressions.fearful,
						],
					},
				],
			};
			if (this.startFlg && this.currentComponent == "CommonTiktok") {
				const diff = this.datacollection.datasets[0].data.reduce(
					(sum, value) => sum + value
				);
				if (diff > fixed.DEDUCTION_TARGET) {
					this.score = Math.floor((this.score - diff) * 10) / 10;
				}
				// 道場破り or リベンジモードで diff が笑った判定に引っかかる場合、ゲームオーバー
				if (this.mode != fixed.MODE.NORMAL && diff >= fixed.LAUGHED_DIFF) {
					this.$store.dispatch("afterGame", this.score);
					this.$store.dispatch("changeModalFlg");
					this.$store.dispatch("enableGameOverFlg");
				}
			}
		},
		AddScore() {
			this.score += fixed.ADDITIONAL_SCORE;
		},
	},
	mounted() {
		this.score = this.mode == fixed.MODE.NORMAL ? fixed.PERFECT_SCORE : fixed.ADDITIONAL_SCORE;
		// 顔モデルロード
		Promise.all([
			faceapi.loadTinyFaceDetectorModel("/weights"),
			faceapi.loadFaceLandmarkModel("/weights"),
			faceapi.loadFaceExpressionModel("/weights"),
		]).then(() => {
			// ウェブカメラへアクセス
			navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
				video.srcObject = stream;
				video.play();
			});
		});
	},
};
</script>
<style scoped>
.emotions-wrapper {
	height: 7rem;
}
.right-wrapper {
	width: 40%;
}
.wrapper {
	height: 100%;
}
.score {
	background-color: #a4db0e;
	margin-top: 0.5rem;
	padding: 0.5rem 1rem;
	color: #ffffff;
	box-shadow: inset 4px 0px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
}
#video {
	transform: scaleX(-1);
	margin: 0 auto;
	margin-top: 1rem;
	position: absolute;
	width: 8%;
}
#canvas {
	transform: scaleX(-1);
	margin: 0 auto;
	margin-top: 1rem;
	background-color: #44beef;
	opacity: 0.7;
}
@media screen and (max-width: 1366px) {
	#video {
		width: 10%;
	}
}
@media screen and (max-width: 1112px) {
	#video {
		width: 15%;
	}
}
@media screen and (max-width: 800px) {
	#video {
		width: 17%;
	}
}
@media screen and (max-width: 425px) {
	.emotions-wrapper {
		height: 9.5rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}
	.score {
		font-size: 1.5rem;
	}
	#video {
		width: 30%;
	}
}
</style>
