<template>
  <LoaderComponent v-if="isLoading" />
  <MainLayout v-else />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import LoaderComponent from "@/components/ui/LoaderComponent.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";

const mediaStore = useMediaStore();
const { fetchAllMedia, fetchAnime } = mediaStore;
const { isLoading } = storeToRefs(mediaStore);

onMounted(async () => {
  isLoading.value = false;
  console.log("APP MOUNTED");
  // await fetchAllMedia();
  // await fetchAnime();
});
</script>
