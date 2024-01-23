<template>
  <section class="bg-primary-dark page-container">
    <SnackbarComponent v-model="snackbar" :options="snackbarOptions" />
    <NavbarComponent v-if="userFromDB && !mdAndUp" />
    <v-layout>
      <NavigationDrawer v-if="userFromDB && mdAndUp" />
      <v-container
        class="text-center rounded"
        :class="{ 'ms-md-14': userFromDB }"
        fluid
      >
        <router-view />
      </v-container>
    </v-layout>
    <FooterComponent class="mt-10" :class="{ 'ms-md-14': userFromDB }" />
    <ScrollToTopButton />
  </section>
</template>
<script setup lang="ts">
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";
import FooterComponent from "@/components/ui/FooterComponent.vue";
import NavbarComponent from "@/components/ui/NavbarComponent.vue";
import NavigationDrawer from "@/components/ui/NavigationDrawer.vue";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";

const mediaStore = useMediaStore();
const { userFromDB, snackbar, snackbarOptions } = storeToRefs(mediaStore);

const {
  mdAndUp,
  // lgAndUp,
} = useDisplay();
</script>
<style scoped>
.page-container {
  min-height: 100vh;
  position: relative;
}
</style>
