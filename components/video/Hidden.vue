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
      <p class="nothing-wrapper">非表示設定のビデオがありません。</p>
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
				this.flashMessage.error({
					html:
						"<div class='flash-msg'><p>Error</p><p>ログインしてください。</p></div>",
				});
				this.$router.push("/login");
			});
    },
    videoDelete(id){
      if (confirm(`ビデオid:${id}の非表示設定を解除します。`)) {
        const page = document.getElementsByTagName("tr").length <= 1 && this.currentPage != 1 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(`api/v1/hidden_videos/${id}`)
          .then(() => {
            this.getPage(page);
            this.scriptFlg = !this.scriptFlg;
            this.flashMessage.success({
              html:
                "<div class='flash-msg'><p>Success</p><p>非表示設定を解除しました。</p></div>",
            });
          })
          .catch((e) => {
            console.log(e);
            this.flashMessage.error({
              html:
                "<div class='flash-msg'><p>Error</p><p>非表示設定解除に失敗しました。</p></div>",
            });
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