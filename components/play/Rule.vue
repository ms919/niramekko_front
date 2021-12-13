<template>
	<div class="text-center section-wrapper">
		<h3>事前準備・ルール説明</h3>
		<div class="text-wrapper">
			<p v-html="text"></p>
			<br>
			<p v-if="loginFlg"><fa :icon='faEyeSlash' transform="left-2" class="orange"/> 動画を非表示リストに登録</p>
			<p><fa :icon='faArrowCircleRight' class="orange"/> &nbsp;次の動画に進む</p>
		</div>
		<a v-if="ruleFlg" @click="$store.dispatch('gotoNext')" class="btn sm-button btn-pink">START</a>
		<a v-else @click="changeFlg" class="btn sm-button btn-pink">次へ</a>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import fixed from "~/const/const.js";
import {
	faEyeSlash,
	faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
export default {
	data(){
		return {
			ruleFlg: false
		}
	},
	computed: {
		...mapGetters(["mode"]),
		...mapGetters({loginFlg: "session/loginFlg"}),
		text() {
			if (!this.ruleFlg) {
				return "①カメラを許可してください<br/>②右下に自分の顔が写るようにカメラを調節します<br/>③自分の顔の輪郭、各パーツ上に線が表示されていることを確認します<br/>④表情を動かしたときに左下のグラフが動くことを確認してください"
			}
			switch (this.mode) {
				case fixed.MODE.NORMAL:
					return (
							"最初に100スコアが付与されます。<br/>tiktokのおもしろ動画を見て、笑いを堪えてください。5つの動画を再生後、最終スコアによって称号が決まります。<br/>高スコアを目指して笑いを堪らえよう！"
					);
				case fixed.MODE.DOJYO:
					return (
						"最も笑われている動画ベストを見て笑いを堪えるモードです。<br/>最初に20スコアが付与され、その後は各動画クリア毎に20スコアが付与されます。笑いを堪えきれないとゲームオーバーになります。ゲームクリアを目指して笑いを堪らえよう！"
					);
				case fixed.MODE.REVENGE:
					return (
						"過去に笑ってしまった動画にリベンジするモードです。<br/>最初に20スコアが付与され、その後は各動画クリア毎に20スコアが付与されます。笑いを堪えきれないとゲームオーバーになります。ゲームクリアを目指して笑いを堪らえよう！"
					);
				default:
					""
			}
		},
		faEyeSlash: () => faEyeSlash,
		faArrowCircleRight: () => faArrowCircleRight,
	},
	methods: {
		changeFlg(){
			this.ruleFlg = true;
		}
	},
	mounted() {
		this.$store.dispatch("getItems");
	},
};
</script>

<style scoped>
.text-wrapper {
	margin: 2rem;
	text-align: left;
	font-size: 0.8rem;
}
.section-wrapper {
	padding: 1.5rem 0;
}
@media screen and (max-width: 425px) {
	.text-wrapper {
		font-size: 1.2rem;
	}
}
</style>
