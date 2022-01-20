<template>
	<div class="text-center rule-wrapper">
		<h3>{{ $t("rule.heading") }}</h3>
		<div class="text-wrapper">
			<p v-html="text"></p>
			<br />
			<p v-if="loginFlg">
				<fa :icon="faEyeSlash" transform="left-2" class="orange" />
				{{ $t("rule.hide_caption") }}
			</p>
			<p>
				<fa :icon="faArrowCircleRight" class="orange" /> &nbsp;{{ $t("rule.next_caption") }}
			</p>
		</div>
		<a
			v-if="ruleFlg"
			@click="$emit('gotoNext')"
			class="btn sm-button btn-pink"
			>START</a
		>
		<a v-else @click="changeFlg" class="btn sm-button btn-pink">{{ $t("next") }}</a>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
	faEyeSlash,
	faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
export default {
	data() {
		return {
			ruleFlg: false,
		};
	},
	computed: {
		...mapGetters(["mode"]),
		...mapGetters({ loginFlg: "session/loginFlg" }),
		text() {
			if (!this.ruleFlg) {
				return this.$t("rule.prepare_text");
			}
			switch (this.mode) {
				case this.$fixed.MODE.NORMAL:
					return this.$t("rule.normal_text", { score: this.$fixed.PERFECT_SCORE });
				case this.$fixed.MODE.DOJO:
					return this.$t("rule.dojo_text", { score: this.$fixed.ADDITIONAL_SCORE });
				case this.$fixed.MODE.REVENGE:
					return this.$t("rule.revenge_text", { score: this.$fixed.ADDITIONAL_SCORE });
				default:
					"";
			}
		},
		faEyeSlash: () => faEyeSlash,
		faArrowCircleRight: () => faArrowCircleRight,
	},
	methods: {
		changeFlg() {
			this.ruleFlg = true;
		},
	},
	mounted() {
		this.$store.dispatch("getItems");
	},
};
</script>

<style scoped>
.text-wrapper {
	margin: 2rem;
	text-align: left;
	font-size: 0.8rem;
}
.rule-wrapper {
	padding: 1.5rem 0;
}
@media screen and (max-width: 425px) {
	.text-wrapper {
		font-size: 1.2rem;
	}
	.rule-wrapper {
		margin-bottom: auto;
	}
}
</style>
