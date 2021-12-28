<template>
  <div class="text-center display-col justify-center wrapper-height">
    <a class="btn lg-button btn-light-blue" @click="goToLink('twitter')">LOGIN with <fa :icon="faTwitter"/></a>
    <a class="btn lg-button btn-green" @click="goToLink('google_oauth2')">LOGIN with <fa :icon="faGoogle"/></a>
    <a class="btn lg-button btn-pink" @click="goToLink('tiktok')">LOGIN with <fa :icon="faTiktok"/></a>
    <div class="terms-wrapper">
      <NuxtLink to="terms">利用規約</NuxtLink>&nbsp;&nbsp;
      <NuxtLink to="privacyPolicy">プライバシーポリシー</NuxtLink>
    </div>
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

<style scoped>
.terms-wrapper {
  margin: 2rem 0;
}
</style>