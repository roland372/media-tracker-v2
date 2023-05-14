<template>
  <HeaderComponent title="Login">
    <div class="page-container d-flex align-center justify-center">
      <button @click="login" class="google-button">
        <span class="google-icon">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
          />
        </span>
        Sign in with Google
      </button>
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import { login } from "@/utils/auth";
</script>
<style scoped>
.google-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.google-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
}

.google-icon img {
  width: 100%;
  height: 100%;
}

.page-container {
  min-height: 75vh;
}
</style>
