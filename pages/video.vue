<template>
	<component :is="currentComponent" @changeComponent="changeComponent"></component>
</template>

<script>
import { mapGetters } from "vuex";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";
export default {
	computed: {
		faListUl: () => faListUl,
    faPlus: () => faPlus,
		...mapGetters(["currentComponent"])
	},
  methods: {
    changeComponent(component){
      this.$store.dispatch("changeCurrentComponent", component);
    },
  },
	beforeDestroy(){
		this.$store.dispatch("clearItem");
	}
}
</script>
