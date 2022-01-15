export const state = () => ({
	currentComponent: "PlayRule",
	itemsPointer: -1,
	items: [],
	currentItem: "<div class='default-item'><p>NO<br/>VIDEO</p></div>",
	scoreArray: [],
	laughedRecords: [],
	hiddenVideos: [],
	startFlg: false,
	modalFlg: false,
	gameFinFlg: false,
	gameOverFlg: false,
	hiddenFlg: false,
	mode: null,
	title: {},
	footerFlg: false,
});

export const getters = {
	currentComponent: (state) => state.currentComponent,
	itemsPointer: (state) => state.itemsPointer,
	items: (state) => state.items,
	itemsLength: (state) => state.items.length,
	currentItem: (state) => state.currentItem,
	scoreArray: (state) => state.scoreArray,
	laughedRecords: (state) => state.laughedRecords,
	hiddenVideos: (state) => state.hiddenVideos,
	videoIds: (state) => state.laughedRecords.map((x) => x.video_id),
	startFlg: (state) => state.startFlg,
	modalFlg: (state) => state.modalFlg,
	gameFinFlg: (state) => state.gameFinFlg,
	gameOverFlg: (state) => state.gameOverFlg,
	hiddenFlg: (state) => state.hiddenFlg,
	mode: (state) => state.mode,
	title: (state) => state.title,
	footerFlg: (state) => state.footerFlg,
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
		state.currentItem = `<blockquote class='tiktok-embed item' cite='https://www.tiktok.com/@${target.video_user}/video/${target.data_video_id}' data-video-id=${target.data_video_id}><section></section></blockquote>`;
	},
	clearItem(state) {
		state.currentComponent = "PlayRule";
		state.itemsPointer = -1;
		state.items = [];
		state.currentItem = "<div class='default-item'><p>NO<br/>VIDEO</p></div>";
		state.scoreArray = [];
		state.laughedRecords = [];
		state.hiddenVideos = [];
		state.startFlg = false;
		state.modalFlg = false;
		state.gameFinFlg = false;
		state.gameOverFlg = false;
		state.hiddenFlg = false;
		state.title = {};
	},
	addScoreArray(state, score) {
		state.scoreArray.push(score);
	},
	addLaughedRecords(state, diff) {
		state.laughedRecords[state.itemsPointer].score_diff = diff;
	},
	addHiddenVideos(state, videoObj) {
		state.hiddenVideos.push(videoObj);
	},
	changeStartFlg(state) {
		state.startFlg = !state.startFlg;
	},
	changeModalFlg(state) {
		state.modalFlg = !state.modalFlg;
	},
	changeHiddenFlg(state) {
		state.hiddenFlg = !state.hiddenFlg;
	},
	enableGameFinFlg(state) {
		state.gameFinFlg = true;
	},
	enableGameOverFlg(state) {
		state.gameOverFlg = true;
	},
	changeTitle(state, title_id) {
		state.title = {
			name: this.$fixed.TITLE_NAMES[title_id],
			tweet_text: this.$fixed.TWEET_TEXTS[title_id],
		};
	},
	changeFooterFlg(state) {
		state.footerFlg = !state.footerFlg;
	},
};

export const actions = {
	setMode({ commit }, mode) {
		commit("setMode", mode);
		const score =
			mode == this.$fixed.MODE.NORMAL
				? this.$fixed.PERFECT_SCORE
				: this.$fixed.ADDITIONAL_SCORE;
		commit("addScoreArray", score);
		this.$router.push("/play");
	},
	getItems({ getters, commit }) {
		// アイテムをクリア
		commit("clearItem");
		// rails側のdbから動画を取ってきてセットする
		this.$axios
			.get("/api/v1/playlists", { params: { mode: getters.mode } })
			.then((res) => {
				// プレイリストセット
				commit("setItems", res.data);
				// laughed_videos/hidden_videos用配列準備
				const arr = res.data.map((obj) => obj.id);
				const new_arr = arr.reduce((new_arr, data, i) => {
					new_arr[i] = { video_id: data };
					return new_arr;
				}, []);
				commit("setLaughedRecords", new_arr);
			})
			.catch((error) => {
				console.log(error);
			});
	},
	gotoNext({ commit, getters, dispatch }, { score, window }) {
		// PlayRule画面ならTiktokコンポーネントに変更
		if (getters.currentComponent == "PlayRule") {
			dispatch("setNextContents");
			commit("changeCurrentComponent", "CommonTiktok");
			// play中ならスコア処理後に次コンテンツをセット
		} else {
			dispatch("calcScore", score);
			dispatch("processHiddenVideos");
			dispatch("setNextContents");
			dispatch("changeStartFlg", false);
			dispatch("video/changeCanPlayFlg", false);
		}
		dispatch("video/checkVideo", window);
	},
	changeStartFlg({ getters, commit }, flg) {
		if (getters.startFlg != flg) commit("changeStartFlg");
	},
	calcScore({ getters, commit }, score) {
		commit("addLaughedRecords", getters.scoreArray.slice(-1)[0] - score);
		commit("addScoreArray", score);
	},
	processHiddenVideos({ getters, commit }) {
		if (getters.hiddenFlg) {
			commit("addHiddenVideos", getters.laughedRecords[getters.itemsPointer]);
			commit("changeHiddenFlg");
		}
	},
	setNextContents({ getters, commit }) {
		// ポインタをインクリメント
		commit("incrementItemsPointer");
		// 更新したポインタに合わせてCurrentItemを変更
		commit("changeCurrentItem", getters.items[getters.itemsPointer]);
	},
	sendResult({ getters, commit }) {
		// game_results
		const score = getters.scoreArray.slice(-1)[0];
		const game_results = {
			mode: getters.mode,
			score: score,
		};
		// laughed_videos登録対象を抽出
		const laughed_videos = getters.laughedRecords.filter(
			(x) => x.score_diff >= this.$fixed.LAUGHED_DIFF
		);
		// hidden_videos登録対象を抽出
		const hidden_videos = getters.hiddenVideos;
		hidden_videos.map((x) => delete x.score_diff);

		// railsへ送信
		this.$axios
			.post("/api/v1/game_results", game_results)
			.then((res) => {
				commit("changeTitle", res.data);
			})
			.catch((error) => {
				console.log(error);
			});
		if (laughed_videos.length > 0) {
			this.$axios
				.post("/api/v1/laughed_videos", laughed_videos)
				.then((res) => {
					commit("session/setRevengeFlg", res.data.revenge_flg);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		if (hidden_videos.length > 0) {
			this.$axios
				.post("/api/v1/hidden_videos", hidden_videos)
				.catch((error) => {
					console.log(error);
				});
		}
	},
	changeModalFlg({ commit }) {
		commit("changeModalFlg");
	},
	changeHiddenFlg({ getters, commit }) {
		const res = getters.hiddenFlg
			? confirm("このビデオの非表示設定を解除します。よろしいですか？")
			: confirm("このビデオを今後表示させないようにします。よろしいですか？");
		if (res) commit("changeHiddenFlg");
	},
	enableGameFinFlg({ commit, dispatch }) {
		commit("enableGameFinFlg");
		dispatch("changeStartFlg", true);
	},
	enableGameOverFlg({ commit }) {
		commit("enableGameOverFlg");
	},
	afterGame({ dispatch }, score) {
		dispatch("calcScore", score);
		dispatch("processHiddenVideos");
		dispatch("sendResult");
		dispatch("enableGameFinFlg");
	},
	clearItem({ commit }) {
		commit("clearItem");
	},
	changeCurrentComponent({ commit }, component) {
		commit("changeCurrentComponent", component);
	},
	goToVideo({ commit }, component) {
		commit("changeCurrentComponent", component);
		this.$router.push("/video");
	},
	updateVideoUrl({ commit }, target) {
		commit("changeCurrentItem", target);
		commit("incrementItemsPointer");
	},
	changeFooterFlg({ commit }) {
		commit("changeFooterFlg");
	},
};
