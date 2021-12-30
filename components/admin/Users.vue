<template>
  <div>
    <CommonPagination :current-page="currentPage" :total-pages="totalPages" @getPage="getPage" class="pagination-wrapper"/>
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>role</th>
        <th>delete</th>
      </tr>
      <tr v-for="item in user_data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.role }}</td>
        <td><a @click="userDelete(item.id)" class="btn xs-button btn-grey">delete</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
	data() {
		return {
			user_data: {},
		};
	},
	methods: {
    getPage(page){
      this.$axios
			.get("api/v1/admin/users", {params: { page: page }})
			.then((res) => {
				this.user_data = res.data.users;
        this.totalPages = res.data.total_pages;
        this.currentPage = page;
			})
			.catch(() => {
        this.showFlashMsg('error', 'アクセス権限がありません。');
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
            this.showFlashMsg('success', 'ユーザーを削除しました。');
          })
          .catch((e) => {
            console.log(e);
            this.showFlashMsg('error', 'ユーザー削除に失敗しました。');
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