const initialState = () => {
	return {
		loginFlg: false,
		revengeFlg: false,
		user: {},
		records: {},
		totalScore: 0,
		notifications: null,
	}
};

export const state = () => initialState();

export const getters = {
	loginFlg: (state) => state.loginFlg,
	revengeFlg: (state) => state.revengeFlg,
	user: (state) => state.user,
	userImg: (state) => state.user.image_url,
	userName: (state) => state.user.name,
	records: (state) => state.records,
	totalScore: (state) => state.totalScore,
	notifications: (state) => state.notifications,
};

export const mutations = {
	clearUser(state) {
		Object.assign(state, initialState());
	},
}

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
		commit("setValue", { target: ["session", "user"], value: data.user }, { root: true });
		commit("setValue", { target: ["session", "records"], value: data.game_results }, { root: true });
		commit("setValue", { target: ["session", "totalScore"], value: data.total_score }, { root: true });
		dispatch("setNotifications", data.notifications);
		dispatch("setLoginFlg");
		dispatch("changeFlg", { target: "session/revengeFlg", flg: data.revenge_flg }, { root: true });
	},
	clearUserInfo({ commit, dispatch }) {
		dispatch("removeLoginFlg");
		commit("clearUser");
	},
	setNotifications({ commit }, notifications) {
		if (notifications.length == 0) {
			notifications = null
		} else {
			notifications.map((item) => {
				item.message = item.format == "latest_top" ? this.$i18n.t("user_notification.latest_top", { score: item.message }) : item.message;
			});
		}
		commit("setValue", { target: ["session", "notifications"], value: notifications }, { root: true });
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
