const initialState = () => {
	return {
		itemsPointer: -1,
		items: [],
		currentItem: "<div class='default-item'><p>NO<br/>VIDEO</p></div>",
		canPlayFlg: false,
		newVideoFlg: false,
	}
};

export const state = () => initialState();

export const getters = {
	itemsPointer: (state) => state.itemsPointer,
	items: (state) => state.items,
	itemsLength: (state) => state.items.length,
	currentItem: (state) => state.currentItem,
	canPlayFlg: (state) => state.canPlayFlg,
  newVideoFlg: (state) => state.newVideoFlg,
};

export const mutations = {
	incrementItemsPointer(state) {
		++state.itemsPointer;
	},
	changeCurrentItem(state, target) {
		state.currentItem = `<blockquote class='tiktok-embed item' cite='https://www.tiktok.com/@${target.video_user}/video/${target.data_video_id}' data-video-id=${target.data_video_id}><section></section></blockquote>`;
	},
	clearItem(state) {
		Object.assign(state, initialState());
	}
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
				dispatch("changeFlg", { target: "video/canPlayFlg", flg: flg }, { root: true });
				if (!getters.canPlayFlg && !getters.newVideoFlg) {
					this.$axios
						.patch(`/api/v1/videos/${rootGetters["game/videoIds"][getters.itemsPointer]}`)
						.then(() => {
							dispatch("changeFlg", { target: "game/startFlg", flg: true }, { root: true });
							this._vm.flashMessage.info({
								html:
									`<div class='flash-msg'><p>info</p><p>${this.$i18n.t("skip_video")}</p></div>`,
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
	updateVideoUrl({ commit }, target) {
		commit("changeCurrentItem", target);
		commit("incrementItemsPointer");
	},
	goToVideo({ dispatch }, component) {
		dispatch("changeCurrentComponent", component, { root: true });
		this.$router.push("/video");
	},
};
