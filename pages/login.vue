<template>
  <div class="text-center display-col justify-center wrapper-height">
    <a class="btn lg-button btn-light-blue" href="http://localhost:3000/api/v1/auth/twitter">LOGIN with <fa :icon="faTwitter"/></a>
    <a class="btn lg-button btn-green">LOGIN with <fa :icon="faGoogle"/></a>
    <a class="btn lg-button btn-pink">LOGIN with <fa :icon="faTiktok"/></a>
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
}
</script>