<template>
  <div>
    <template v-if="videoData.length > 0">
      <CommonPagination :current-page="currentPage" :total-pages="totalPages" @getPage="getPage" class="pagination-wrapper"/>
      <div class="checkbox"><input type="checkbox" id="cannot_play_flg"><label for="cannot_play_flg">cannot_play_flg</label></div>
      <table>
        <tr>
          <th>id</th>
          <th>user_id</th>
          <th>top_flg</th>
          <th>video</th>
          <th>delete</th>
        </tr>
        <tr v-for="item in videoData" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.user_id}}</td>
          <td>{{item.latest_top_flg}}</td>
          <td v-html="`<blockquote class='tiktok-embed item' cite='https://www.tiktok.com/@${item.video_user}/video/${item.data_video_id}' data-video-id=${item.data_video_id}><section></section></blockquote>`"></td>
          <td><a @click="videoDelete(item.id)" class="btn xs-button btn-grey">delete</a></td>
        </tr>
      </table>
    </template>
    <template v-else>
      <p class="nothing-wrapper">{{ $t("error.nothing", { value: $t("corresponding") + $t("video") }) }}</p>
    </template>
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
      const flg = document.getElementById('cannot_play_flg') != null ? document.getElementById('cannot_play_flg').checked : false;
      this.$axios
			.get("api/v1/admin/videos", {params: { page: page, cannot_play_flg: flg }})
			.then((res) => {
				this.videoData = res.data.videos;
        this.totalPages = res.data.total_pages;
        this.currentPage = page;
        this.scriptFlg = !this.scriptFlg;
        console.log(this.videoData.length > 0);
			})
			.catch(() => {
        this.showFlashMsg('error', this.$t("error.nothing", { value: this.$t("access_authority") }));
				this.$router.push("/login");
			});
    },
    videoDelete(id){
      if (confirm(this.$t("confirm.delete", { value: this.$t("video_id") + id }))) {
        const page = document.getElementsByTagName("tr").length <= 2 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(`api/v1/admin/videos/${id}`)
          .then(() => {
            this.getPage(page);
            this.scriptFlg = !this.scriptFlg;
            this.showFlashMsg('success', this.$t("success.delete", { value: this.$t("video") }));
          })
          .catch((e) => {
            console.log(e);
            this.showFlashMsg('error', this.$t("error.delete", { value: this.$t("video") }));
          });
      }
    }
  },
  created(){
    this.getPage(1);
  }
}
</script>

<style scoped>
.pagination-wrapper {
  position: sticky;
  top: 0;
}
.checkbox {
  text-align: left;
  margin: 0.5rem;
  font-size: 0.8rem;
}
</style>

<style scoped src="@/assets/css/video.css"></style>