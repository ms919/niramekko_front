const initialState = () => {
	return {
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
	}
};

export const state = () => initialState();

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
	clearItem(state) {
		Object.assign(state, initialState());
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
	changeTitle(state, key) {
		state.title = {
			name: this.$i18n.t(`title_names.${key}`),
			tweet_text: this.$i18n.t(`tweet_texts.${key}`),
		};
	},
};

export const actions = {
	setMode({ commit }, mode) {
    commit("setValue", { target: ["game", "mode"], value: mode }, { root: true });
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
        commit("setValue", { target: ["video", "items"], value: res.data }, { root: true });
				// laughed_videos/hidden_videos用配列準備
				const arr = res.data.map((obj) => obj.id);
				const new_arr = arr.reduce((new_arr, data, i) => {
					new_arr[i] = { video_id: data };
					return new_arr;
				}, []);
        commit("setValue", { target: ["game", "laughedRecords"], value: new_arr }, { root: true });
			})
			.catch((error) => {
				console.log(error);
			});
	},
	gotoNext({ dispatch, rootGetters }, { score, window }) {
		// PlayRule画面ならTiktokコンポーネントに変更
		if (rootGetters["currentComponent"] == "PlayRule") {
			dispatch("setNextContents");
			dispatch("changeCurrentComponent", "CommonTiktok", { root: true });
			// play中ならスコア処理後に次コンテンツをセット
		} else {
			dispatch("calcScore", score);
			dispatch("processHiddenVideos");
			dispatch("setNextContents");
      dispatch("changeFlg", { target: "game/startFlg", flg: false }, { root: true });
      dispatch("changeFlg", { target: "video/canPlayFlg", flg: false }, { root: true });
		}
		dispatch("video/checkVideo", window, { root: true });
	},
	calcScore({ getters, commit, rootGetters }, score) {
		commit("addLaughedRecords", { diff: getters.scoreArray.slice(-1)[0] - score, pointer: rootGetters["video/itemsPointer"]});
		commit("addScoreArray", score);
	},
	processHiddenVideos({ getters, commit, rootGetters }) {
		if (getters.hiddenFlg) {
			commit("addHiddenVideos", getters.laughedRecords[rootGetters["video/itemsPointer"]]);
			commit("changeFlg", ["game", "hiddenFlg"], { root: true });
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
          dispatch("changeFlg", { target: "session/revengeFlg", flg: res.data.revenge_flg }, { root: true });
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
	enableGameFinFlg({ dispatch }) {
    dispatch("changeFlg", { target: "game/gameFinFlg", flg: true }, { root: true });
    dispatch("changeFlg", { target: "game/startFlg", flg: true }, { root: true });
	},
  changeHiddenFlg({ getters, commit }) {
		const res = getters.hiddenFlg
			? confirm(this.$i18n.t("confirm.video_unhidden", { value: this.$i18n.t("this") + this.$i18n.t("video")} ))
			: confirm(this.$i18n.t("confirm.video_hidden", { value: this.$i18n.t("this") + this.$i18n.t("video")} ));
    if (res) commit("changeFlg", ["game", "hiddenFlg"], { root: true });
	},
	afterGame({ dispatch }, score) {
		dispatch("calcScore", score);
		dispatch("processHiddenVideos");
		dispatch("sendResult");
		dispatch("enableGameFinFlg");
	},
};
