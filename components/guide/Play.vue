<template>
  <div class="display-col justify-center text-center">
    <h3>{{ $t("game_play.heading") }}</h3>
    <br>
    <div class="grid">
      <div>
        <p>{{ $t("game_play.caption_1") }}</p>
        <img src="guide/play/001_top.png">
      </div>
      <div>
        <p>{{ $t("game_play.caption_2") }}</p>
        <img src="guide/play/002_modeSelect.png">
      </div>
      <div>
        <p>{{ $t("game_play.caption_3") }}</p>
        <img src="guide/play/003_prepare.png">
      </div>
      <div>
        <p>{{ $t("game_play.caption_4") }}</p>
        <img src="guide/play/004_rule.png">
      </div>
      <div>
        <p>{{ $t("game_play.caption_5") }}</p>
        <img src="guide/play/005_play.png">
      </div>
      <div>
        <p>{{ $t("game_play.caption_6") }}</p>
        <img src="guide/play/006_play.png">
      </div>
      <div>
        <p>{{ $t("game_play.caption_7") }}</p>
        <img src="guide/play/007_score.png">
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  text-align: left;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}
.grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  row-gap: 1rem;
  column-gap: 2rem;
}
@media screen and (max-width: 425px) {
  img {
    margin: 0 auto;
  }
}
</style>