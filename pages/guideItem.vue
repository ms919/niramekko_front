<template>
  <div class="display-col justify-center white-wrapper">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentComponent: "",
    }
  },
  mounted(){
    this.currentComponent = this.$route.query.component;
  }
}
</script>

<style scoped>
</style>