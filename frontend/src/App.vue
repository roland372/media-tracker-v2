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
import { setDefaultTheme } from "@/utils/themes";

const mediaStore = useMediaStore();
const { fetchAllMedia, fetchUser, setLoading, setGoogleUser } = mediaStore;
const { isLoading, googleUser } = storeToRefs(mediaStore);

onMounted(async () => {
  // console.log("APP MOUNTED");
  setDefaultTheme();
  try {
    const googleId = localStorage.getItem("googleId");

    if (!googleId) setLoading(false);
    setGoogleUser(await getUserData());
  } catch (error) {
    setLoading(false);
  }
  if (googleUser.value) {
    await fetchUser(googleUser.value.email, googleUser.value._id);
    await fetchAllMedia(googleUser.value.email);
  }
});
</script>
<style>
:root {
  --text-color: #ffffff;
  --link-color: #0dcaf0;

  --blue-500: #12232e;
  --blue-400: #203647;
  --blue-300: #284155;
  --blue-200: #023e8a;
  --blue-100: #4da8da;

  --gray-500: #1c1c1c;
  --gray-400: #343434;
  --gray-300: #555555;
  --gray-200: #696969;
  --gray-100: #7c7c7c;

  --bg-primary-dark: var(--blue-500);
  --bg-primary-medium: var(--blue-400);
  --bg-primary-light: var(--blue-200);
  --bg-secondary-medium: var(--blue-300);
  --bg-secondary-light: var(--blue-100);
}

.bg-primary-dark {
  background-color: var(--bg-primary-dark);
}

.bg-primary-medium {
  background-color: var(--bg-primary-medium);
}

.bg-primary-light {
  background-color: var(--bg-primary-light);
}

.bg-secondary-medium {
  background-color: var(--bg-secondary-medium);
}

.bg-secondary-light {
  background-color: var(--bg-secondary-light);
}

.bg-rainbow {
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
}

.text-color {
  color: var(--text-color);
}

.link-color {
  color: var(--text-color);
}
</style>
