export const state = () => ({
	currentComponent: "PlayRule",
	footerFlg: false,
});

export const getters = {
	currentComponent: (state) => state.currentComponent,
	footerFlg: (state) => state.footerFlg,
};

export const mutations = {
	changeCurrentComponent(state, nextComponent) {
		state.currentComponent = nextComponent;
	},
	clearItem(state) {
		state.currentComponent = "PlayRule";
	},
	changeFlg(rootState, target){
		if (target.length == 1) rootState[target[0]] = !rootState[target[0]];
		if (target.length == 2) rootState[target[0]][target[1]] = !rootState[target[0]][target[1]];
	}
};

export const actions = {
	clearItem({ commit }) {
		commit("clearItem");
		commit("video/clearItem");
		commit("game/clearItem");
	},
	changeCurrentComponent({ commit }, component) {
		commit("changeCurrentComponent", component);
	},
	changeFlg({ commit, rootGetters}, { target, flg }) {
		const setFlg = flg ? true : false;
		if (rootGetters[target] != setFlg) commit("changeFlg", target.split("/"));
	},
};
