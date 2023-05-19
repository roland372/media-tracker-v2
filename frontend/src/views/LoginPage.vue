<template>
  <HeaderComponent title="Login">
    <div class="page-container d-flex align-center justify-center">
      <GoogleLogin :callback="login" />
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import { GoogleLogin } from "vue3-google-login";
import { login } from "@/utils/auth";
</script>
<style scoped>
.page-container {
  min-height: 75vh;
}
</style>
