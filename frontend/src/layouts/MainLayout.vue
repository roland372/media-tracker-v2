<template>
  <NavbarComponent />
  <router-view />
  <FooterComponent />
  <!--* navbar -->
  <!--* sidebar -->
  <!--* main content (router-view) -->
  <!--* footer -->
</template>
<script setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>
