<template>
  <div class="display-col justify-center top-wrapper section-wrapper">
    <h3>{{ $t("contact.caption") }}</h3>
    <form class="display-col">
      <div class="form-group">
        <select v-model="type" class="color-grey">
          <option v-for="(value, key) in $t('contact.type')" :key="key" :value="key">{{ value }}</option>
        </select>
        <p class="contact-font-size">{{ $t("contact.text_area_caption") }}</p>
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
        this.showFlashMsg('error', this.$t("error.length", { value: this.$t("message"), min: "10", max: "500"}));
      } else {
        this.$axios
        .post("/api/v1/contacts", {contact_type: this.type, message: this.message})
				.then(() => {
					this.message = "";
          this.showFlashMsg('success', this.$t("success.submit", this.$t("message")));
				})
				.catch((error) => {
					console.log(error);
          this.showFlashMsg('error', this.$t("error.submit", this.$t("message")));
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