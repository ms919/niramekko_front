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
		<div class="right-wrapper display-col">
			<p class="score">SCORE 88</p>
			<div>
				<video id="video" width="100" height="75" @play="onPlay"></video>
				<canvas id="canvas" width="100" height="75"></canvas>
			</div>
		</div>
	</div>
</template>
<script>
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
			datacollection: null,
		};
	},
	computed: {
		faSadTear: () => faSadTear,
		faLaughSquint: () => faLaughSquint,
		faAngry: () => faAngry,
		faSurprise: () => faSurprise,
		faDizzy: () => faDizzy,
	},
	methods: {
		onPlay() {
			const video = document.getElementById("video"); // video 要素を取得
			const canvas = document.getElementById("canvas"); // canvas 要素の取得

			setInterval(async () => {
				// ウェブカメラの映像から顔データを取得
				const detections = await faceapi
					.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceLandmarks()
					.withFaceExpressions();
				// 顔データをリサイズ
				const resizedDetections = faceapi.resizeResults(detections, {
					width: video.width,
					height: video.height,
				});

				// キャンバスに描画
				canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
				faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
				if (detections !== undefined) {
					const expressions = detections.expressions;
					this.fillData(expressions);
				}
			}, 500);
		},
		fillData(expressions) {
			this.datacollection = {
				labels: ["sad", "happy", "angry", "surprised", "disgusted"],
				datasets: [
					{
						backgroundColor: "#e43965",
						data: [
							expressions.sad * 10,
							expressions.happy * 10,
							expressions.angry * 10,
							expressions.surprised * 10,
							(expressions.disgusted + expressions.fearful) * 10,
						],
					},
				],
			};
		},
	},
	mounted() {
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
}
#canvas {
	transform: scaleX(-1);
	margin: 0 auto;
	margin-top: 1rem;
	background-color: #44beef;
	opacity: 0.7;
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
}
</style>
