<template>
  <LoaderComponent v-if="isLoading" />
  <MainLayout v-else />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { setDefaultTheme } from "@/utils/themes";
import LoaderComponent from "@/components/ui/LoaderComponent.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const mediaStore = useMediaStore();
const { fetchAllMedia, fetchUser } = mediaStore;
const { isLoading } = storeToRefs(mediaStore);

const userEmail = process.env.VUE_APP_USER_EMAIL as string;
const userID = process.env.VUE_APP_USER_ID as string;

onMounted(async () => {
  // console.log("APP MOUNTED");
  setDefaultTheme();
  try {
    await fetchUser(userEmail, userID);
    await fetchAllMedia(userEmail);
  } catch (error) {
    console.error(error);
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

body {
  background-color: var(--bg-primary-dark);
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
  color: var(--link-color);
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: var(--bg-primary-light);
}

::-webkit-scrollbar-track {
  background-color: var(--bg-primary-medium);
}

@media (max-width: 480px) {
  html {
    font-size: 0.75rem !important;
  }
}

@media (min-width: 480px) {
  html {
    font-size: 0.8rem !important;
  }
}

@media (min-width: 768px) {
  html {
    font-size: 0.85rem !important;
  }
}

@media (min-width: 992px) {
  html {
    font-size: 0.9rem !important;
  }
}

@media (min-width: 1200px) {
  html {
    font-size: 1rem !important;
  }
}
</style>
