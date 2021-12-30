export const state = () => ({
	loginFlg: false,
	revengeFlg: false,
	user: {},
	records: {},
	total_score: 0,
	notifications: null,
});

export const getters = {
	loginFlg: (state) => state.loginFlg,
	revengeFlg: (state) => state.revengeFlg,
	user: (state) => state.user,
	userImg: (state) => state.user.image_url,
	userName: (state) => state.user.name,
	records: (state) => state.records,
	total_score: (state) => state.total_score,
	notifications: (state) => state.notifications,
};

export const mutations = {
	reloadLoginFlg(state, value) {
		state.loginFlg = value;
	},
	setRevengeFlg(state, value) {
		state.revengeFlg = value;
	},
	setUser(state, userData) {
		state.user = userData;
	},
	setRecords(state, records) {
		state.records = records;
	},
	setTotalScore(state, value) {
		state.total_score = value;
	},
	setNotifications(state, notifications) {
		state.notifications = notifications;
	},
};

export const actions = {
	init({ commit, dispatch }) {
		if (localStorage.getItem("loginFlg")) {
			commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
			this.$axios
				.get("api/v1/user")
				.then((res) => {
					dispatch("setUserInfo", res.data);
				})
				.catch(() => {
					dispatch("removeLoginFlg");
					this._vm.flashMessage.error({
						html:
							"<div class='flash-msg'><p>error</p><p>セッションの有効期限が切れています。ログインしなおしてください。</p></div>",
					});
				});
		}
	},
	removeLoginFlg({ commit }) {
		localStorage.removeItem("loginFlg");
		commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
	},
	setLoginFlg({ commit }) {
		localStorage.setItem("loginFlg", true);
		commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
	},
	setUserInfo({ commit, dispatch }, data) {
		commit("setUser", data.user);
		commit("setRecords", data.game_results);
		commit("setTotalScore", data.total_score);
		dispatch("setNotifications", data.notifications);
		dispatch("setLoginFlg");
		commit("setRevengeFlg", data.revenge_flg);
	},
	clearUserInfo({ commit, dispatch }) {
		commit("setUser", {});
		commit("setRecords", {});
		commit("setTotalScore", 0);
		commit("setNotifications", null);
		dispatch("removeLoginFlg");
		commit("setRevengeFlg", false);
	},
	setNotifications({ commit }, notifications) {
		if (notifications.length == 0) {
			notifications = null
		} else {
			notifications.map((item) => {
				item.message = item.format == "latest_top" ? `あなたの投稿したビデオが最新ベスト入りしました！${item.message}スコアが付与されます。` : item.message;
			});
		}
		commit("setNotifications", notifications);
	},
	logout({ dispatch }) {
		this.$axios
			.delete("api/v1/logout")
			.then(() => {
				dispatch("clearUserInfo");
				location.reload();
			})
			.catch((e) => console.log(e));
	},
};
