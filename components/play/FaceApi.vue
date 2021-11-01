<template>
	<div class="content">
		<video id="video" width="100" height="75" @play="onPlay"></video>
		<canvas id="canvas" width="100" height="75"></canvas>
	</div>
</template>
<script>
import * as faceapi from "face-api.js";
export default {
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
		// fillData(expressions) {
		// 	this.datacollection = {
		// 		labels: ["sad", "happy", "angry", "surprised", "disgusted", "fearful"],
		// 		datasets: [
		// 			{
		// 				backgroundColor: "#f87979",
		// 				data: [
		// 					expressions.sad * 10,
		// 					expressions.happy * 30,
		// 					expressions.angry * 10,
		// 					expressions.surprised * 10,
		// 					expressions.disgusted * 10,
		// 					expressions.fearful * 10,
		// 				],
		// 			},
		// 		],
		// 	};
		// },
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
.content {
	position: relative;
	margin: 3rem;
}
#video {
	transform: scaleX(-1);
	position: absolute;
}
#canvas {
	transform: scaleX(-1);
	position: absolute;
	left: 0;
	top: 0;
	background-color: #44beef;
	opacity: 0.7;
}
</style>
