import fixed from "~/const/const.js";
export const state = () => ({
	currentComponent: "PlayRule",
	itemsPointer: -1,
	items: [],
	currentItem: "<div class='default-item'><p>NO<br/>VIDEO</p></div>",
	scoreArray: [fixed.PERFECT_SCORE],
	laughedRecords: [],
	startFlg: false,
	modalFlg: false,
	openResultFlg: false,
	mode: null,
	title: {},
	loginFlg: localStorage.getItem("loginFlg"),
});

export const getters = {
	currentComponent: (state) => state.currentComponent,
	itemsPointer: (state) => state.itemsPointer,
	items: (state) => state.items,
	itemsLength: (state) => state.items.length,
	currentItem: (state) => state.currentItem,
	scoreArray: (state) => state.scoreArray,
	laughedRecords: (state) => state.laughedRecords,
	startFlg: (state) => state.startFlg,
	modalFlg: (state) => state.modalFlg,
	openResultFlg: (state) => state.openResultFlg,
	mode: (state) => state.mode,
	title: (state) => state.title,
	loginFlg: (state) => state.loginFlg,
};

export const mutations = {
	setMode(state, mode) {
		state.mode = mode;
	},
	changeCurrentComponent(state, nextComponent) {
		state.currentComponent = nextComponent;
	},
	incrementItemsPointer(state) {
		++state.itemsPointer;
	},
	setItems(state, items) {
		state.items = items;
	},
	setLaughedRecords(state, videoIds) {
		state.laughedRecords = videoIds;
	},
	changeCurrentItem(state, target) {
		state.currentItem = `<blockquote class='tiktok-embed item' cite='https://www.tiktok.com/${target.video_user}/video/${target.data_video_id}' data-video-id=${target.data_video_id}><section></section></blockquote>`;
	},
	clearItem(state) {
		state.currentComponent = "PlayRule";
		state.itemsPointer = -1;
		state.items = [];
		state.currentItem = "<div class='default-item'><p>NO<br/>VIDEO</p></div>";
		state.scoreArray = [fixed.PERFECT_SCORE];
		state.laughedRecords = [];
		state.startFlg = false;
		state.modalFlg = false;
		state.openResultFlg = false;
		state.title = {};
	},
	addScoreArray(state, score) {
		state.scoreArray.push(score);
	},
	addLaughedRecords(state, diff) {
		state.laughedRecords[state.itemsPointer].score_diff = diff;
	},
	changeStartFlg(state) {
		state.startFlg = !state.startFlg;
	},
	changeModalFlg(state) {
		state.modalFlg = !state.modalFlg;
	},
	enableOpenResultFlg(state) {
		state.openResultFlg = true;
	},
	changeTitle(state, title) {
		state.title = title;
	},
	reloadLoginFlg(state, value) {
		state.loginFlg = value;
	}
};

export const actions = {
	setMode({ commit }, mode) {
		commit("setMode", mode);
		this.$router.push("/play");
	},
	getItems({ commit }) {
		// アイテムをクリア
		commit("clearItem");
		// rails側のdbから動画を取ってきてセットする
		this.$axios
			.get("/api/v1/playlists")
			.then((res) => {
				// プレイリストセット
				commit("setItems", res.data);
				// 結果記録用配列準備
				const arr = res.data.map((obj) => obj.id);
				const new_arr = arr.reduce((new_arr, data, i) => {
					new_arr[i] = { video_id: data };
					return new_arr;
				}, []);
				console.log(new_arr);
				commit("setLaughedRecords", new_arr);
			})
			.catch((error) => {
				console.log(error);
			});
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
			commit("changeStartFlg");
		}
	},
	changeStartFlg({ commit }) {
		commit("changeStartFlg");
	},
	calcScore({ getters, commit }, score) {
		const diff = getters.scoreArray.slice(-1)[0] - score;
		commit("addLaughedRecords", diff);
		commit("addScoreArray", score);
		// console.log(getters.laughedRecords);
		// console.log(getters.scoreArray);
	},
	setNextContents({ getters, commit }) {
		// ポインタをインクリメント
		commit("incrementItemsPointer");
		// 更新したポインタに合わせてCurrentItemを変更
		const target = getters.items[getters.itemsPointer];
		commit("changeCurrentItem", target);
	},
	sendResult({ getters, dispatch }) {
		// game_results
		const score = getters.scoreArray.slice(-1)[0];
		dispatch("calcTitle", score);
		const game_results = {
			title_id: getters.title.id,
			mode: getters.mode,
			score: score,
		};
		// laughed_videos登録対象を抽出
		const laughed_videos = getters.laughedRecords.filter(
			(x) => x.score_diff >= 10
		);
		// railsへ送信
		this.$axios
			.post("/api/v1/game_results", game_results)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
		this.$axios
			.post("/api/v1/laughed_videos", laughed_videos)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	},
	calcTitle({ commit }, score) {
		let title;
		switch (true) {
			case score >= fixed.SCORE_LEVELS.GOLD:
				title = fixed.TITLES.GOLD;
				break;
			case score >= fixed.SCORE_LEVELS.IRON:
				title = fixed.TITLES.IRON;
				break;
			case score >= fixed.SCORE_LEVELS.SOIL:
				title = fixed.TITLES.SOIL;
				break;
			case score >= fixed.SCORE_LEVELS.SMILE:
				title = fixed.TITLES.SMILE;
				break;
			case score < fixed.SCORE_LEVELS.SMILE:
				title = fixed.TITLES.LAUGH;
				break;
			default:
				title = {};
		}
		commit("changeTitle", title);
	},
	changeModalFlg({ commit }) {
		commit("changeModalFlg");
	},
	enableOpenResultFlg({ commit }) {
		commit("enableOpenResultFlg");
		commit("changeStartFlg");
	},
	clearItem({ commit }) {
		commit("clearItem");
	},
	reloadLoginFlg({commit}){
		commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
	},
	updateVideoUrl({ commit }, target) {
		commit("changeCurrentItem", target);
		commit("incrementItemsPointer");
	},
};
