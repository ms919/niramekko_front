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
			.get("api/v1/admin/contacts", { params: { page: page } })
			.then((res) => {
				this.contact_data = res.data.contacts;
        this.totalPages = res.data.total_pages;
        this.currentPage = page;
			})
			.catch(() => {
        this.showFlashMsg('error', this.$t("error.nothing", { value: this.$t("access_authority") }));
				this.$router.push("/login");
			});
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