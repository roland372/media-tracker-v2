<template>
  <section class="bg-orange">
    <NavbarComponent />
    <v-layout>
      <v-container class="text-center rounded">
        <router-view />
      </v-container>
    </v-layout>
    <FooterComponent />
    <ScrollToTopButton />
  </section>
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/ui/NavbarComponent.vue";
import FooterComponent from "@/components/ui/FooterComponent.vue";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton.vue";
</script>
<style scoped>
section {
  min-height: 100vh;
}
</style>
