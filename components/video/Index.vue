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
            <a @click="videoDelete(item.id)" class="btn xs-button btn-grey">delete</a>
          </td>
        </tr>
      </table>
    </template>
    <div v-else class="text-center">
      <p class="nothing-wrapper">投稿ビデオがありません。</p>
    </div>
  </div>
</template>

<script>
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
  methods: {
    getPage(page){
      this.$axios
			.get("api/v1/videos", {params: { page: page }})
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
      if (confirm(`ビデオid:${id}を削除してよろしいですか？`)) {
        const page = document.getElementsByTagName("tr").length <= 1 && this.currentPage != 1 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(`api/v1/videos/${id}`)
          .then(() => {
            this.getPage(page);
            this.scriptFlg = !this.scriptFlg;
            this.showFlashMsg('success', 'ビデオを削除しました。');
          })
          .catch((e) => {
            console.log(e);
            this.showFlashMsg('error', 'ビデオ削除に失敗しました。');
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