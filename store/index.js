const initialState = () => {
	return {
		currentComponent: "PlayRule",
		footerFlg: false,
	}
};

export const state = () => initialState();

export const getters = {
	currentComponent: (state) => state.currentComponent,
	footerFlg: (state) => state.footerFlg,
};

export const mutations = {
	clearItem(state) {
		state.currentComponent = "PlayRule";
	},
	changeFlg(rootState, target){
		if (target.length == 1) rootState[target[0]] = !rootState[target[0]];
		if (target.length == 2) rootState[target[0]][target[1]] = !rootState[target[0]][target[1]];
	},
	setValue(rootState, { target, value }){
		if (target.length == 1) rootState[target[0]] = value;
		if (target.length == 2) rootState[target[0]][target[1]] = value;
	},
};

export const actions = {
	clearItem({ commit }) {
		commit("clearItem");
		commit("video/clearItem");
		commit("game/clearItem");
	},
	changeCurrentComponent({ commit }, component) {
		commit("setValue", { target: ["currentComponent"], value: component });
	},
	changeFlg({ commit, rootGetters}, { target, flg }) {
		if (rootGetters[target] != flg) commit("changeFlg", target.split("/"));
	},
};
