<template>
  <div class="text-center display-col justify-center wrapper-height">
    <a class="btn lg-button btn-light-blue" @click="goToLink('twitter')">LOGIN with <fa :icon="faTwitter"/></a>
    <a class="btn lg-button btn-green" @click="goToLink('google_oauth2')">LOGIN with <fa :icon="faGoogle"/></a>
    <a class="btn lg-button btn-pink">LOGIN with <fa :icon="faTiktok"/></a>
    <FlashMessage :position="'right bottom'"></FlashMessage>
  </div>
</template>

<script>
import { faTwitter, faGoogle, faTiktok } from "@fortawesome/free-brands-svg-icons";
export default {
  computed: {
    faTwitter: () => faTwitter,
    faGoogle: () => faGoogle,
    faTiktok: () => faTiktok,
  },
  methods: {
    goToLink(provider){
      window.location.href = `${this.$config.auth_url}/${provider}`
    }
  },
}
</script>