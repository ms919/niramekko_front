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
            <a @click="videoDelete(item.id)" class="btn xs-button btn-grey"><fa :icon="faEye" class="eye-icon"/></a>
          </td>
        </tr>
      </table>
    </template>
    <div v-else class="text-center">
      <p class="nothing-wrapper">{{ $t("error.nothing", { value: $t("hidden_video") }) }}</p>
    </div>
  </div>
</template>

<script>
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";

export default {
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
    faEyeSlash: () => faEyeSlash,
    faEye: () => faEye,
  },
  methods: {
    getPage(page){
      this.$axios
			.get("api/v1/hidden_videos", {params: { page: page }})
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
      if (confirm(this.$t("confirm.video_unhidden", { value: this.$t("video_id") + id} ))) {
        const page = document.getElementsByTagName("tr").length <= 1 && this.currentPage != 1 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(`api/v1/hidden_videos/${id}`)
          .then(() => {
            this.getPage(page);
            this.scriptFlg = !this.scriptFlg;
            this.showFlashMsg('success', this.$t("success.cancel", { value: this.$t("hidden_setting") }));
          })
          .catch((e) => {
            console.log(e);
            this.showFlashMsg('error', this.$t("error.cancel", { value: this.$t("cancel_hidden") }));
          });
      }
    }
  },
  created(){
    this.getPage(1);
  }
}
</script>

<style scoped src="@/assets/css/video.css"></style>
<style scoped>
.eye-icon {
  font-size: 1.7rem;
}
</style>