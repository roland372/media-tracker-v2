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
import { getUserData } from "@/utils/auth";
import router from "@/router";

const mediaStore = useMediaStore();
const { setUserEmail, fetchAllMedia, setLoading } = mediaStore;
const { isLoading, userEmail } = storeToRefs(mediaStore);

onMounted(async () => {
  console.log("APP MOUNTED");
  try {
    setUserEmail(await getUserData());
  } catch (error) {
    setLoading(false);
    router.push("/login");
  }
  if (userEmail) {
    await fetchAllMedia(userEmail.value);
  }
});
</script>
