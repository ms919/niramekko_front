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
});

export default(context, inject) => {
  inject('fixed', fixed);
}