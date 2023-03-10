<template>
  <MainLayout />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import MainLayout from "./layouts/MainLayout.vue";

onMounted(async () => {
  console.log("MOUNTED");
});
</script>
