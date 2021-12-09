<template>
	<div class="display-col justify-center">
    <h2>Admin</h2>
    <div class="admin-wrapper text-center">
      <a @click="changeComponent('AdminVideos')" class="btn sm-button btn-grey">Videos</a>
      <a @click="changeComponent('AdminUsers')" class="btn sm-button btn-grey">Users</a>
      <component :is="currentComponent" @changeComponent="changeComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
	layout: "admin",
  data(){
    return {
      currentComponent: "AdminVideos",
    }
  },
  methods: {
    changeComponent(component){
      this.currentComponent = component;
    },
  }
};
</script>

<style scoped>
.admin-wrapper {
  width: 90%;
  height: 90vh;
}
</style>