export const state = () => ({
	canPlayFlg: false,
  newVideoFlg: false,
});

export const getters = {
	canPlayFlg: (state) => state.canPlayFlg,
  newVideoFlg: (state) => state.newVideoFlg,
};

export const mutations = {
	changeCanPlayFlg(state) {
		state.canPlayFlg = !state.canPlayFlg;
	},
  changeNewVideoFlg(state) {
		state.newVideoFlg = !state.newVideoFlg;
	},
};

export const actions = {
	checkVideo({ getters, dispatch, rootGetters }, window) {
		let flg = false;
		let count = 0;
		let height = 0;
		const timerId = setInterval(() => {
			count++;
			height = Number(
				window
					.getComputedStyle(document.getElementsByTagName("iframe")[0])
					.getPropertyValue("height")
					.replace("px", "")
			);
			flg = height > 700;
			if (flg || (height > 1 && height < 300) || count == 10) {
				clearInterval(timerId);
				dispatch("changeCanPlayFlg", flg);
				if (!getters.canPlayFlg && !getters.newVideoFlg) {
					this.$axios
						.patch(`/api/v1/videos/${rootGetters["videoIds"][rootGetters["itemsPointer"]]}`)
						.then(() => {
							dispatch("changeStartFlg", true, { root: true });
							this._vm.flashMessage.info({
								html:
									"<div class='flash-msg'><p>info</p><p>→ボタンをクリックしてください。</p></div>",
                time: 3000,
							});
						})
						.catch((error) => {
							console.log(error);
						});
				}
			}
		}, 1000);
	},
	changeCanPlayFlg({ getters, commit }, flg) {
		if (getters.canPlayFlg != flg) commit("changeCanPlayFlg");
	},
  changeNewVideoFlg({ getters, commit }, flg) {
		if (getters.newVideoFlg != flg) commit("changeNewVideoFlg");
	},
};
