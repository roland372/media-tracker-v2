<template>
  <section class="bg-primary-dark page-container">
    <NavbarComponent v-if="googleUser && !mdAndUp" />
    <v-layout>
      <NavigationDrawer v-if="mdAndUp" />
      <v-container class="text-center rounded ms-md-14" fluid>
        <router-view />
      </v-container>
    </v-layout>
    <FooterComponent class="mt-10 ms-md-14" />
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

const mediaStore = useMediaStore();
const { googleUser } = storeToRefs(mediaStore);

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
