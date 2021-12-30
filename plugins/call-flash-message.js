import Vue from 'vue'

Vue.mixin({
  methods: {
    showFlashMsg(status, msg) {
      this.flashMessage.show({
          status: status,
					html:
						`<div class='flash-msg'><p>${status}</p><p>${msg}</p></div>`,
				});
    },
    needLoginMsg(){
      this.showFlashMsg('error', 'ログインしてください。');
      this.$router.push("/login");
    }
  }
})