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
	changeFooterFlg(state) {
		state.footerFlg = !state.footerFlg;
	},
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
	changeFooterFlg({ commit }) {
		commit("changeFooterFlg");
	},
};
