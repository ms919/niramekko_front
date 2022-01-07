const fixed = Object.freeze({
	HAPPY_MULTIPLICATION: 10,
	DEDUCTION_TARGET: 1,
	PERFECT_SCORE: 500,
	ADDITIONAL_SCORE: 100,
	LAUGHED_DIFF: 7,
	MODE: {
		NORMAL: 0,
		DOJYO: 1,
		REVENGE: 2,
	},
	TITLE_NAMES: [
		"金城鉄壁真顔人",
		"鉄壁の真顔人",
		"土壁の真顔人",
		"ニッコリさん",
		"ゲラゲラ星人",
	],
	TWEET_TEXTS: [
		"何を見ても、何を聞いても笑わない、非の打ち所の無い素晴らしい忍耐力の持ち主です。",
    "すごい忍耐力ですね。自分の真顔に自信を持って、さらなる高みへ！",
    "まずまずの忍耐力です。この調子で真顔に磨きをかけましょう！",
    "思わず笑ってしまいましたね。次は真顔人入りを目指しましょう！",
    "よく笑いましたで笑！"
	],
});

export default(context, inject) => {
  inject('fixed', fixed);
}