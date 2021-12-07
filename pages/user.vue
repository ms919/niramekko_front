<template>
  <component :is="currentComponent" @changeComponent="changeComponent"></component>
</template>
<script>
export default {
  data(){
    return {
      currentComponent: "UserProfile"
    }
  },
  methods: {
    changeComponent(component){
      this.currentComponent = component;
    },
  }
}
</script>
