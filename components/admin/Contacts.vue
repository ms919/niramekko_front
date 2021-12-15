<template>
  <div>
    <CommonPagination :current-page="currentPage" :total-pages="totalPages" @getPage="getPage" class="pagination-wrapper"/>
    <table>
      <tr>
        <th>id</th>
        <th>type</th>
        <th>state</th>
        <th>message</th>
      </tr>
      <tr v-for="item in contact_data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.contact_type }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.message}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
	data() {
		return {
			contact_data: {},
		};
	},
	methods: {
    getPage(page){
      this.$axios
			.get("api/v1/admin/contacts", {params: { page: page }})
			.then((res) => {
				this.contact_data = res.data.contacts;
        this.totalPages = res.data.total_pages;
        this.currentPage = page;
			})
			.catch(() => {
				this.flashMessage.error({
					html:
						"<div class='flash-msg'><p>Error</p><p>アクセス権限がありません。</p></div>",
				});
				this.$router.push("/login");
			});
    },
		userDelete(id) {
      if (confirm(`ユーザーid:${id}を削除してよろしいですか？`)) {
        const page = document.getElementsByTagName("tr").length <= 2 ? this.currentPage - 1 : this.currentPage;
        this.$axios
          .delete(`api/v1/admin/users/${id}`)
          .then(() => {
            this.getPage(page);
            this.flashMessage.success({
              html:
                "<div class='flash-msg'><p>Success</p><p>ユーザーを削除しました。</p></div>",
            });
          })
          .catch((e) => {
            console.log(e);
            this.flashMessage.error({
              html:
                "<div class='flash-msg'><p>Error</p><p>ユーザー削除に失敗しました。</p></div>",
            });
          });
      }
		},
	},
	created() {
		this.getPage(1);
	},
};
</script>

<style scoped>
.pagination-wrapper {
  position: sticky;
  top: 0;
}
</style>