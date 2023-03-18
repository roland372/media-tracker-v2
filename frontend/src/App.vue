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
const { fetchAllMedia } = mediaStore;
const { isLoading } = storeToRefs(mediaStore);

onMounted(async () => {
  console.log("APP MOUNTED");
  await fetchAllMedia();
});
</script>
