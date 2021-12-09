<template>
  <div>
    <CommonPagination :current-page="currentPage" :total-pages="totalPages" @getPage="getPage"/>
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
			.get("api/v1/admin/videos", {params: { page: page }})
			.then((res) => {
				this.videoData = res.data.videos;
        this.totalPages = res.data.total_pages;
        this.currentPage = page;
        this.scriptFlg = !this.scriptFlg;
			})
			.catch(() => {
				this.flashMessage.error({
					html:
						"<div class='flash-msg'><p>Error</p><p>アクセス権限がありません。</p></div>",
				});
				this.$router.push("/login");
			});
    },
    videoDelete(id){
      if (confirm(`ビデオid:${id}を削除してよろしいですか？`)) {
        const page = document.getElementsByTagName("tr").length <= 2 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(`api/v1/admin/videos/${id}`)
          .then(() => {
            this.getPage(page);
            this.scriptFlg = !this.scriptFlg;
            this.flashMessage.success({
              html:
                "<div class='flash-msg'><p>Success</p><p>ビデオを削除しました。</p></div>",
            });
          })
          .catch((e) => {
            console.log(e);
            this.flashMessage.error({
              html:
                "<div class='flash-msg'><p>Error</p><p>ビデオ削除に失敗しました。</p></div>",
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
