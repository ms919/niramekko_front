<template>
  <div class="display-col justify-center text-center">
    <h3>ゲームの遊び方</h3>
    <br>
    <div class="grid">
      <div>
        <p>1. [PLAY]ボタンをクリック</p>
        <img src="guide/play/001_top.png">
      </div>
      <div>
        <p>2. モードを選択</p>
        <img src="guide/play/002_modeSelect.png">
      </div>
      <div>
        <p>3. 事前準備をして[次へ]をクリック</p>
        <img src="guide/play/003_prepare.png">
      </div>
      <div>
        <p>4. ルールを確認したら[start]をクリック</p>
        <img src="guide/play/004_rule.png">
      </div>
      <div>
        <p>5. TikTok動画が表示されたら再生ボタンをクリック</p>
        <img src="guide/play/005_play.png">
      </div>
      <div>
        <p>6. ビデオの再生が終わったら→ボタンで次の動画へ</p>
        <img src="guide/play/006_play.png">
      </div>
      <div>
        <p>7. 再生リストを全て見終えたら、スコアに応じた称号が付与されます。より高いスコアを目指して笑いを堪らえよう！</p>
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