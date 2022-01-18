<template>
  <div class="grid text-center">
    <a class="grid-item" @click="gotoGuide('GuidePlay')">
      <p v-html="$t('guide.game_play')"></p>
      <fa :icon="faPlayCircle" class="guide-icon pink"/>
    </a>
    <a class="grid-item disabled">
      <p v-html="$t('guide.login')"></p>
      <fa :icon="faUserCircle" class="guide-icon orange"/>
      <p>{{ $t("coming_soon") }}</p>
    </a>
    <a class="grid-item disabled">
      <p v-html="$t('guide.new_video')"></p>
      <br>
      <fa :icon="faVideo" class="guide-icon yellow-green"/>
      <p>{{ $t("coming_soon") }}</p>
    </a>
  </div>
</template>

<script>
import {faPlayCircle, faUserCircle, faVideo} from "@fortawesome/free-solid-svg-icons";
export default {
  computed: {
    faPlayCircle: () => faPlayCircle,
    faUserCircle: () => faUserCircle,
    faVideo: () => faVideo,
  },
  methods: {
		gotoGuide(component){
      this.$router.push({ path: "guideItem" , query : { component: component }});
    }
	},
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-top: 3rem;
}
.grid-item {
  margin: 1rem;
  padding: 1rem;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}
.guide-icon {
  font-size: 2rem;
  margin: 2rem 0;
}
</style>