import fixed from "~/const/const.js";
export const state = () => ({
	currentComponent: "PlayRule",
	itemsPointer: -1,
	items: [
		{
			cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
			dataVideoId: "6995542759981452549",
		},
		{
			cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
			dataVideoId: "7004422606770146562",
		},
		{
			cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
			dataVideoId: "6995542759981452549",
		},
		{
			cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
			dataVideoId: "7004422606770146562",
		},
		{
			cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
			dataVideoId: "6995542759981452549",
		},
	],
	currentItem: "<div class='default-item'><p>NO<br/>VIDEO</p></div>",
	scoreArray: [fixed.PERFECT_SCORE],
	laughedVideos: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
	startFlg: false,
});

export const getters = {
	currentComponent: (state) => state.currentComponent,
	itemsPointer: (state) => state.itemsPointer,
	items: (state) => state.items,
	itemsLength: (state) => state.items.length,
	currentItem: (state) => state.currentItem,
	scoreArray: (state) => state.scoreArray,
	laughedVideos: (state) => state.laughedVideos,
	startFlg: (state) => state.startFlg,
};

export const mutations = {
	changeCurrentComponent(state, nextComponent) {
		state.currentComponent = nextComponent;
	},
	incrementItemsPointer(state) {
		++state.itemsPointer;
	},
	changeCurrentItem(state, target) {
		state.startFlg = false;
		state.currentItem = `<blockquote class='tiktok-embed item' cite=${target.cite} data-video-id=${target.dataVideoId}><section></section></blockquote>`;
	},
	clearItem(state) {
		state.currentComponent = "PlayRule";
		state.itemsPointer = -1;
		state.items = [
			{
				cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
				dataVideoId: "6995542759981452549",
			},
			{
				cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
				dataVideoId: "7004422606770146562",
			},
			{
				cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
				dataVideoId: "6995542759981452549",
			},
			{
				cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
				dataVideoId: "7004422606770146562",
			},
			{
				cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
				dataVideoId: "6995542759981452549",
			},
		];
		state.currentItem = "<div class='default-item'><p>NO<br/>VIDEO</p></div>";
		state.scoreArray = [fixed.PERFECT_SCORE];
		state.laughedVideos = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
		state.startFlg = false;
	},
	addScoreArray(state, score) {
		state.scoreArray.push(score);
	},
	addLaughedVideos(state, diff) {
		state.laughedVideos[state.itemsPointer].score_diff = diff;
	},
	enableStartFlg(state) {
		state.startFlg = true;
	},
};

export const actions = {
	getItems({ commit, getters }) {
		// アイテムをクリア
		// commit("clearItem");
		// rails側のdbから動画を取ってきてセットする
		console.log("getItems");
	},
	gotoNext({ commit, getters, dispatch }, score) {
		// PlayRule画面ならTiktokコンポーネントに変更
		if (getters.currentComponent == "PlayRule") {
			dispatch("setNextContents");
			commit("changeCurrentComponent", "CommonTiktok");
		// play中ならスコア処理後に次コンテンツをセット
		} else {
			dispatch("calcScore", score);
			dispatch("setNextContents");
		}
	},
	enableStartFlg({commit}){
		commit("enableStartFlg");
	},
	calcScore({getters, commit}, score){
		const diff = getters.scoreArray.slice(-1)[0] - score;
		if (diff > 10) {
			commit("addLaughedVideos", diff);
		} else {
			// LaughedVideosを削除
		}
		commit("addScoreArray", score);
		// console.log(getters.laughedVideos[getters.itemsPointer].score_diff);
		// console.log(getters.scoreArray);
	},
	setNextContents({ getters, commit }){
		// ポインタをインクリメント
		commit("incrementItemsPointer");
		// 更新したポインタに合わせてCurrentItemを変更
		const target = getters.items[getters.itemsPointer];
		commit("changeCurrentItem", target);
	},
	gotoRetry({ commit }) {
		commit("clearItem");
		this.$router.push("/play");
	},
	clearItem({ commit }) {
		commit("clearItem");
	},
	updateVideoUrl({ commit }, url) {
		const target = {
			cite: url,
			dataVideoId: url.slice(url.lastIndexOf("/") - url.length + 1),
		};
		commit("changeCurrentItem", target);
		commit("incrementItemsPointer");
	},
};
