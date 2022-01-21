export const state = () => ({
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
});

export const getters = {
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
};

export const mutations = {
	setMode(state, mode) {
		state.mode = mode;
	},
  setLaughedRecords(state, videoIds) {
		state.laughedRecords = videoIds;
	},
	clearItem(state) {
		state.scoreArray = [];
		state.laughedRecords = [];
		state.hiddenVideos = [];
		state.startFlg = false;
		state.modalFlg = false;
		state.gameFinFlg = false;
		state.gameOverFlg = false;
		state.hiddenFlg = false;
    state.mode = null;
		state.title = {};
	},
	addScoreArray(state, score) {
		state.scoreArray.push(score);
	},
	addLaughedRecords(state, {diff: diff, pointer: pointer}) {
		state.laughedRecords[pointer].score_diff = diff;
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
	changeTitle(state, key) {
		state.title = {
			name: this.$i18n.t(`title_names.${key}`),
			tweet_text: this.$i18n.t(`tweet_texts.${key}`),
		};
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
		// rails側のdbから動画を取ってきてセットする
		this.$axios
			.get("/api/v1/playlists", { params: { mode: getters.mode } })
			.then((res) => {
				// プレイリストセット
				commit("video/setItems", res.data, { root: true });
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
	gotoNext({ commit, dispatch, rootGetters }, { score, window }) {
		// PlayRule画面ならTiktokコンポーネントに変更
		if (rootGetters["currentComponent"] == "PlayRule") {
			dispatch("setNextContents");
			commit("changeCurrentComponent", "CommonTiktok", { root: true });
			// play中ならスコア処理後に次コンテンツをセット
		} else {
			dispatch("calcScore", score);
			dispatch("processHiddenVideos");
			dispatch("setNextContents");
			dispatch("changeStartFlg", false);
			dispatch("video/changeCanPlayFlg", false, { root: true });
		}
		dispatch("video/checkVideo", window, { root: true });
	},
	changeStartFlg({ getters, commit }, flg) {
		if (getters.startFlg != flg) commit("changeStartFlg");
	},
	calcScore({ getters, commit, rootGetters }, score) {
		commit("addLaughedRecords", { diff: getters.scoreArray.slice(-1)[0] - score, pointer: rootGetters["video/itemsPointer"]});
		commit("addScoreArray", score);
	},
	processHiddenVideos({ getters, commit, rootGetters }) {
		if (getters.hiddenFlg) {
			commit("addHiddenVideos", getters.laughedRecords[rootGetters["video/itemsPointer"]]);
			commit("changeHiddenFlg");
		}
	},
	setNextContents({ commit, rootGetters }) {
		// ポインタをインクリメント
		commit("video/incrementItemsPointer", null, { root: true });
		// 更新したポインタに合わせてCurrentItemを変更
		commit("video/changeCurrentItem", rootGetters["video/items"][rootGetters["video/itemsPointer"]], { root: true });
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
			? confirm(this.$i18n.t("confirm.video_unhidden", { value: this.$i18n.t("this") + this.$i18n.t("video")} ))
			: confirm(this.$i18n.t("confirm.video_hidden", { value: this.$i18n.t("this") + this.$i18n.t("video")} ));
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
};
