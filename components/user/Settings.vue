<template>
	<div class="display-col justify-center top-wrapper settings-wrapper">
		<div class="text-center">
			<div class="setting-title">
				<h3 class="white-shadow">Settings</h3>
				<fa
					:icon="faChevronLeft"
					@click="$emit('changeComponent', 'UserProfile')"
					class="back-icon left"
				/>
			</div>
			<form class="display-row">
				<div class="form-group">
					<label class="white-shadow left">name&nbsp;</label>
					<input
						id="name"
						type="text"
						v-model.lazy.trim="name"
						@focusout="focusoutName"
					/>
				</div>
			</form>
			<br />
			<hr class="line" />
			<br />
			<div @click="deleteAccount" class="delete-account">
				<fa :icon="faExclamationTriangle" />&nbsp;delete account
			</div>
		</div>
	</div>
</template>
<script>
import {
	faChevronLeft,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
export default {
	data() {
		return {
			name: this.$store.getters["session/userName"],
		};
	},
	computed: {
		faChevronLeft: () => faChevronLeft,
		faExclamationTriangle: () => faExclamationTriangle,
	},
	methods: {
		focusoutName() {
			const len = this.name.length;
			// 64はgoogleの最大値
			if (len > 64) {
				this.showFlashMsg('error', `nameが${len}文字です。64文字以内で設定してください。`);
			}
		},
		deleteAccount() {
			if (confirm("アカウントを削除します。よろしいですか？")) {
				this.$axios
					.delete("api/v1/user")
					.then(() => {
						this.$store.dispatch("session/clearUserInfo");
						this.$router.push("/");
						this.showFlashMsg('success', 'アカウントを削除しました。');
					})
					.catch(() => {
						this.showFlashMsg('error', 'アカウントの削除に失敗しました。');
					});
			}
		},
	},
	beforeDestroy() {
		const old_name = this.$store.getters["session/userName"];
		if (old_name != undefined && old_name != this.name) {
			this.$axios
				.patch("api/v1/user", { name: this.name })
				.then(() => {
					this.$axios
						.get("api/v1/user")
						.then((res) => {
							this.$store.dispatch("session/setUserInfo", res.data);
						});
					this.showFlashMsg('success', 'nameを更新しました。');
				})
				.catch(() => {
					this.showFlashMsg('error', 'nameの更新に失敗しました。');
				});
		}
	},
};
</script>

<style scoped>
.setting-title {
	width: 100%;
}
.back-icon {
	cursor: pointer;
}
.left {
	display: block;
	margin-right: auto;
}
.line {
	border: 1px dotted #ffffff;
}
.delete-account {
	font-size: 0.8rem;
	cursor: pointer;
}
@media screen and (max-width: 425px) {
	.settings-wrapper {
    height: 50vh;
	}
}
</style>
