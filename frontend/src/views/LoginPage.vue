<template>
  <HeaderComponent title="Login">
    <div class="page-container d-flex align-center justify-center">
      <GoogleLogin :callback="login" prompt />
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import { GoogleLogin } from "vue3-google-login";
import { login } from "@/utils/auth";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
</script>
<style scoped>
.page-container {
  min-height: 75vh;
}
</style>
