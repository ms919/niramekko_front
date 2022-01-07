export const state = () => ({
	canPlayFlg: false,
});

export const getters = {
	canPlayFlg: (state) => state.canPlayFlg,
};

export const mutations = {
	changeCanPlayFlg(state) {
		state.canPlayFlg = !state.canPlayFlg;
	},
};

export const actions = {
	checkVideo({ dispatch }, window) {
		let flg = false;
		let count = 0;
		const timerId = setInterval(() => {
			count++;
			flg =
				Number(window
					.getComputedStyle(document.getElementsByTagName("iframe")[0])
					.getPropertyValue("height").replace("px", "")) > 700;
			if (flg || count == 10) {
				clearInterval(timerId);
				dispatch("changeCanPlayFlg", flg);
			}
		}, 1000);
	},
	changeCanPlayFlg({ getters, commit }, flg) {
		if (getters.canPlayFlg != flg) commit("changeCanPlayFlg");
	},
};
