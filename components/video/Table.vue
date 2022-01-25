<template>
  <div class="display-col justify-center videos-wrapper">
    <template v-if="videoData.length > 0">
      <div class="display-row justify-center upper-wrapper">
        <div class="pagination-wrapper"><CommonPagination :current-page="currentPage" :total-pages="totalPages" @getPage="getPage"/></div>
      </div>
      <table class="text-center">
        <tr v-for="item in videoData" :key="item.id">
          <td>
            <blockquote class='tiktok-embed item' :cite="`https://www.tiktok.com/@${item.video_user}/video/${item.data_video_id}`" :data-video-id="`${item.data_video_id}`">
              <section></section>
            </blockquote>
            <a @click="videoDelete(item.id)" class="btn xs-button btn-grey">
              <p v-if="indexFlg">delete</p>
              <fa v-else :icon="faEye" class="eye-icon"/>
            </a>
          </td>
        </tr>
      </table>
    </template>
    <div v-else class="text-center">
      <p v-if="indexFlg" class="nothing-wrapper">{{ $t("error.nothing", { value: $t("posted") + $t("video") }) }}</p>
      <p v-else class="nothing-wrapper">{{ $t("error.nothing", { value: $t("hidden_video") }) }}</p>
    </div>
  </div>
</template>

<script>
import {faEye} from "@fortawesome/free-solid-svg-icons";

export default {
  props: ["showMode", "updateFlg"],
  head() {
		return {
			script: [
				{
					type: "text/javascript",
					src: "https://www.tiktok.com/embed.js",
					async: this.scriptFlg,
					body: this.scriptFlg,
				},
			],
		};
	},
  data(){
    return {
      scriptFlg: false,
      videoData: {},
      currentPage: null,
      totalPages: null,
    }
  },
  computed: {
    indexFlg() { return this.showMode == this.$fixed.VIDEO_SHOW_MODE.INDEX; },
    getUrl() { return this.indexFlg ? "api/v1/videos" : "api/v1/hidden_videos"; },
    deleteUrl() { return this.indexFlg ? "api/v1/videos/" : "api/v1/hidden_videos/"; },
    confirmText() {
      return (id) => {
        return this.indexFlg ? this.$t("confirm.delete", { value: this.$t("video_id") + id }) : this.$t("confirm.video_unhidden", { value: this.$t("video_id") + id} )
      }
    },
    deleteSuccessText() { this.indexFlg ? this.$t("success.delete", { value: this.$t("video") }) : this.$t("success.cancel", { value: this.$t("hidden_setting") }) },
    deleteErrorText() { this.indexFlg ? this.$t("error.delete", { value: this.$t("video") }) : this.$t("error.cancel", { value: this.$t("cancel_hidden") }) },
    faEye: () => faEye,
  },
  methods: {
    getPage(page){
      console.log("hoge");
      this.$axios
			.get(this.getUrl, {params: { page: page }})
			.then((res) => {
				this.videoData = res.data.videos;
        this.totalPages = res.data.total_pages;
        this.currentPage = page;
        this.scriptFlg = !this.scriptFlg;
			})
			.catch(() => {
        this.needLoginMsg();
			});
    },
    videoDelete(id){
      if (confirm(this.confirmText(id))) {
        const page = document.getElementsByTagName("tr").length <= 1 && this.currentPage != 1 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(this.deleteUrl + id)
          .then(() => {
            this.getPage(page);
            this.scriptFlg = !this.scriptFlg;
            this.showFlashMsg('success', this.deleteSuccessText);
          })
          .catch((e) => {
            console.log(e);
            this.showFlashMsg('error', this.deleteErrorText);
          });
      }
    }
  },
  updated(){
    if (this.updateFlg) {
      this.getPage(1);
      this.$emit("update:updateFlg", false);
    }
  }
}
</script>

<style scoped src="@/assets/css/video.css"></style>
<style scoped>
.eye-icon {
  font-size: 1.7rem;
}
</style>