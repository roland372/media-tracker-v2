<template>
  <HeaderComponent title="Music"></HeaderComponent>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
</script>
