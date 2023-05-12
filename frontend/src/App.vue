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
const { fetchAllMedia, fetchUser, setLoading, setGoogleUser } = mediaStore;
const { isLoading, googleUser } = storeToRefs(mediaStore);

onMounted(async () => {
  console.log("APP MOUNTED");
  try {
    setGoogleUser(await getUserData());
  } catch (error) {
    setLoading(false);
    router.push("/login");
  }
  if (googleUser.value) {
    await fetchUser(googleUser.value.email, googleUser.value._id);
    await fetchAllMedia(googleUser.value.email);
  }
});
</script>
