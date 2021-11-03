export const state = () => ({
	currentComponent: "PlayRule",
	itemsPointer: -1,
	items: [
		{
			cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
			dataVideoId: "6995542759981452549",
		},
		{
			cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
			dataVideoId: "7004422606770146562",
		},
		{
			cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
			dataVideoId: "6995542759981452549",
		},
		{
			cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
			dataVideoId: "7004422606770146562",
		},
		{
			cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
			dataVideoId: "6995542759981452549",
		},
	],
	currentItem: "<div class='default-item'><p>NO<br/>VIDEO</p></div>",
});

export const getters = {
	currentComponent: (state) => state.currentComponent,
	itemsPointer: (state) => state.itemsPointer,
	items: (state) => state.items,
	currentItem: (state) => state.currentItem,
};

export const mutations = {
	changeCurrentComponent(state, nextComponent) {
		state.currentComponent = nextComponent;
	},
	incrementItemsPointer(state) {
		++state.itemsPointer;
	},
	changeCurrentItem(state, target) {
		state.currentItem = `<blockquote class='tiktok-embed item' cite=${target.cite} data-video-id=${target.dataVideoId}><section></section></blockquote>`;
	},
	clearItem(state) {
		state.currentComponent = "PlayRule";
		state.itemsPointer = -1;
		state.items = [
			{
				cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
				dataVideoId: "6995542759981452549",
			},
			{
				cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
				dataVideoId: "7004422606770146562",
			},
			{
				cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
				dataVideoId: "6995542759981452549",
			},
			{
				cite: "https://www.tiktok.com/@shakedadesu/video/7004422606770146562",
				dataVideoId: "7004422606770146562",
			},
			{
				cite: "https://www.tiktok.com/@mercuri_88/video/6995542759981452549",
				dataVideoId: "6995542759981452549",
			},
		];
		state.currentItem = "<div class='default-item'><p>NO<br/>VIDEO</p></div>";
	},
};

export const actions = {
	getItems({ commit, getters }) {
    // アイテムをクリア
    // commit("clearItem");
		// rails側のdbから動画を取ってきてセットする
		console.log("getItems");
	},
	gotoNext({ commit, getters }) {
		// 最初にポインタをインクリメント
		commit("incrementItemsPointer");
		// 更新したポインタに合わせてCurrentItemを変更
		const pointer = getters.itemsPointer;
		const target = getters.items[pointer];
		commit("changeCurrentItem", target);
		// 次のコンポーネントをセット
		if (getters.currentComponent != "CommonTiktok") {
			commit("changeCurrentComponent", "CommonTiktok");
		}
	},
	gotoRetry({ commit }) {
		commit("clearItem");
    this.$router.push('/play');
	},
	clearItem({commit}){
		commit("clearItem");
	},
	updateVideoUrl({commit}, url) {
		const target = {
			cite: url,
			dataVideoId: url.slice(url.lastIndexOf("/") - url.length + 1),
		};
		commit("changeCurrentItem", target);
		commit("incrementItemsPointer");
	}
};
