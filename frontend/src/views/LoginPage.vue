<template>
  <HeaderComponent title="Login">
    <div>
      <button :onclick="login">login</button>
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import { login } from "@/utils/auth";

onMounted(async () => {
  console.log("LOGIN MOUNTED");
});
</script>
