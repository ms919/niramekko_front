<template>
  <div class="display-col justify-center top-wrapper section-wrapper">
    <h3>ご意見・ご要望等、お待ちしています。</h3>
    <form class="display-col">
      <div class="form-group">
        <select v-model="type" class="color-grey">
          <option value="request">ご要望</option>
          <option value="bug">不具合報告</option>
          <option value="thoughts">ご感想</option>
          <option value="others">その他</option>
        </select>
        <p class="contact-font-size">10〜500文字で記載してください。</p>
        <textarea id="message" rows="7" v-model.lazy.trim="message" class="contact-font-size color-grey" />
      </div>
      <a @click="sendMessage" class="btn sm-button btn-yellow-green text-center">send</a>
    </form>
  </div>
</template>

<script>
import {
	faPaperPlane,
	faCheckCircle,
	faBan,
} from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
		return {
			message: "",
			type: "request"
		};
	},
	computed: {
		faPaperPlane: () => faPaperPlane,
		faCheckCircle: () => faCheckCircle,
		faBan: () => faBan,
	},
  methods: {
    sendMessage(){
      if (this.message.length < 10 || this.message.length > 500) {
        this.flashMessage.error({
          html:
            "<div class='flash-msg'><p>Error</p><p>メッセージは10文字以上、500文字未満で記載してください。</p></div>",
        });
      } else {
        this.$axios
        .post("/api/v1/contacts", {contact_type: this.type, message: this.message})
				.then(() => {
					this.message = "";
					this.flashMessage.success({
						html:
							"<div class='flash-msg'><p>Success</p><p>メッセージを送信しました。</p></div>",
					});
				})
				.catch((error) => {
					console.log(error);
					this.flashMessage.error({
						html:
							"<div class='flash-msg'><p>Error</p><p>メッセージの送信に失敗しました。</p></div>",
					});
				});
      }
    }
  }
}
</script>

<style scoped>
.color-grey {
  color: #898989;
}
.contact-font-size {
  font-size: 0.8rem;
}
.form-group {
  align-items: start;
  width: 50%;
}
form {
  width: 100%;
}
select {
  width: 7rem;
  border:none;
  border-radius:10px;
  font-size: 0.8rem;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
}
textarea {
  border:none;
  border-radius:10px;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  width: 100%;
}
@media screen and (max-width: 425px) {
  .form-group {
    width: 70%;
  }
}
</style>