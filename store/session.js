export const state = () => ({
	loginFlg: false,
	revengeFlg: false,
	user: {},
	records: {},
	total_score: 0,
});

export const getters = {
	loginFlg: (state) => state.loginFlg,
	revengeFlg: (state) => state.revengeFlg,
	user: (state) => state.user,
	userImg: (state) => state.user.image_url,
	records: (state) => state.records,
	total_score: (state) => state.total_score,
};

export const mutations = {
	reloadLoginFlg(state, value) {
		state.loginFlg = value;
	},
	setRevengeFlg(state, value){
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
	}
};

export const actions = {
	init({ commit, dispatch }) {
		if (localStorage.getItem("loginFlg")) {
			commit("reloadLoginFlg", localStorage.getItem("loginFlg"));
			this.$axios.get("api/v1/user").then((res) => {
				dispatch("setUserInfo", res.data);
			}).catch(()=> {
				dispatch("removeLoginFlg");
				this._vm.flashMessage.error({
					html:
						"<div class='flash-msg'><p>Error</p><p>セッションの有効期限が切れています。ログインしなおしてください。</p></div>",
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
		dispatch("setLoginFlg");
		commit("setRevengeFlg", data.revenge_flg);
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
