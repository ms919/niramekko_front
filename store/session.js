export const state = () => ({
	loginFlg: localStorage.getItem("loginFlg"),
	user: {},
});

export const getters = {
	loginFlg: (state) => state.loginFlg,
	user: (state) => state.user,
	userImg: (state) => state.user.image_url,
};

export const mutations = {
	reloadLoginFlg(state, value) {
		state.loginFlg = value;
	},
	setUser(state, userData) {
		state.user = userData;
	},
};

export const actions = {
	removeLoginFlg({ commit }) {
		localStorage.removeItem("loginFlg");
		commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
	},
	setLoginFlg({ commit }) {
		localStorage.setItem("loginFlg", true);
		commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
	},
	setUser({ commit, dispatch }, userData) {
		commit("setUser", userData);
		dispatch("setLoginFlg");
	},
	logout({ dispatch }) {
		this.$axios
			.get("api/v1/logout")
			.then(() => {
				dispatch("removeLoginFlg");
				location.reload();
			})
			.catch((e) => console.log(e));
	},
};
