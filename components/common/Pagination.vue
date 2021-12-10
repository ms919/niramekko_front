<template>
	<ul class="pagination">
    <template v-if="currentPage==1">
      <li class="disabled"><a>prev</a></li>
    </template>
    <template v-else>
      <li><a @click="getPage(currentPage-1)">prev</a></li>
    </template>
		<template v-if="totalPages < 7">
			<li v-for="n of totalPages" :key="n" :id="`${n}`">
				<a @click="getPage(n)">{{ n }}</a>
			</li>
		</template>
		<template v-else-if="currentPage <= 3 || totalPages - currentPage < 2">
			<li v-for="n of 3" :key="`first-${n}`" :id="`${n}`">
				<a @click="getPage(n)">{{ n }}</a>
			</li>
			…
			<li v-for="n of 2" :key="`second-${n}`" :id="`${totalPages - 2 + n}`">
				<a @click="getPage(totalPages - 2 + n)">{{ totalPages - 2 + n }}</a>
			</li>
		</template>
		<template v-else>
			<li><a @click="getPage(1)">1</a></li>
			…
			<li v-for="n of 2" :key="n" :id="`${currentPage - 1 + n}`">
				<a @click="getPage(currentPage - 1 + n)">{{ currentPage - 1 + n }}</a>
			</li>
			…
			<li>
				<a @click="getPage(totalPages)">{{ totalPages }}</a>
			</li>
		</template>
    <template v-if="currentPage == totalPages">
		  <li class="disabled"><a>next</a></li>
    </template>
    <template v-else>
      <li><a @click="getPage(currentPage+1)">next</a></li>
    </template>
	</ul>
</template>

<script>
export default {
	props: ["currentPage", "totalPages"],
	methods: {
		getPage(page) {
      document.getElementById(this.currentPage).classList.remove("selected");
      this.$emit("getPage", page);
		},
	},
  mounted(){
    if (!this.currentPage) return;
    document.getElementById(this.currentPage).classList.add("selected");
  },
	updated() {
    document.getElementById(this.currentPage).classList.add("selected");
	},
};
</script>

<style scoped>
.pagination {
	align-items: center;
	display: flex;
	margin: 1rem auto;
}
.pagination a {
	display: block;
	padding: 0.3rem 0.7rem;
}
li {
  padding-inline-start: 0;
}
.pagination li {
	margin: 0.5rem 0.5rem;
	border-radius: 50px;
	background-color: #ffffff;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}
.selected {
  border: 5px solid #e43965;
}
</style>
