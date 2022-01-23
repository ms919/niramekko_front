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
	init({ dispatch }) {
		if (localStorage.getItem("loginFlg")) {
			dispatch("changeFlg", { target: "session/loginFlg", flg: localStorage.getItem("loginFlg") }, { root: true });
			this.$axios
				.get("api/v1/user")
				.then((res) => {
					dispatch("setUserInfo", res.data);
				})
				.catch(() => {
					dispatch("removeLoginFlg");
					this._vm.flashMessage.error({
						html:
							`<div class='flash-msg'><p>error</p><p>${this.$i18n.t("error.session_expired")}</p></div>`,
					});
				});
		}
	},
	removeLoginFlg({ dispatch }) {
		localStorage.removeItem("loginFlg");
		dispatch("changeFlg", { target: "session/loginFlg", flg: localStorage.getItem("loginFlg") }, { root: true });
	},
	setLoginFlg({ dispatch }) {
		localStorage.setItem("loginFlg", true);
		dispatch("changeFlg", { target: "session/loginFlg", flg: localStorage.getItem("loginFlg") }, { root: true });
	},
	setUserInfo({ commit, dispatch }, data) {
		commit("setUser", data.user);
		commit("setRecords", data.game_results);
		commit("setTotalScore", data.total_score);
		dispatch("setNotifications", data.notifications);
		dispatch("setLoginFlg");
		dispatch("changeFlg", { target: "session/revengeFlg", flg: data.revenge_flg }, { root: true });
	},
	clearUserInfo({ commit, dispatch }) {
		commit("setUser", {});
		commit("setRecords", {});
		commit("setTotalScore", 0);
		commit("setNotifications", null);
		dispatch("removeLoginFlg");
		dispatch("changeFlg", { target: "session/revengeFlg", flg: false }, { root: true });
	},
	setNotifications({ commit }, notifications) {
		if (notifications.length == 0) {
			notifications = null
		} else {
			notifications.map((item) => {
				item.message = item.format == "latest_top" ? this.$i18n.t("user_notification.latest_top", { score: item.message }) : item.message;
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
