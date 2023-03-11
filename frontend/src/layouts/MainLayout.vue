<template>
  <section class="bg-orange">
    <NavbarComponent />
    <v-layout>
      <v-container class="text-center rounded">
        <router-view />
      </v-container>
    </v-layout>
    <FooterComponent />
  </section>
  <!--* navbar -->
  <!--* sidebar -->
  <!--* main content (router-view) -->
  <!--* footer -->
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>
<style scoped>
section {
  min-height: 100vh;
}
</style>
