<template>
  <v-layout class="mb-10 pb-10">
    <v-app-bar app color="white">
      <template v-slot:append>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!mdAndUp" />
      </template>
      <v-btn to="/" :active="false" :ripple="false" size="x-large">
        <v-app-bar-title class="mx-n3"> Media-Tracker </v-app-bar-title>
      </v-btn>
      <v-list class="d-flex justify-start align-center" v-if="mdAndUp">
        <v-list-item
          :to="link.url"
          v-for="(link, index) in filteredLinks"
          :key="index"
        >
          {{ link.text }}
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" location="end" temporary>
      <v-list-item>
        <v-list-item-title class="text-h6"> Learning Vuetify</v-list-item-title>
        <v-list-item-subtitle> Using Navigation drawers</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <!-- <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list> -->
      <v-list dense nav>
        <v-list-item
          v-for="(link, index) in filteredLinks"
          :key="index"
          :to="link.url"
        >
          <v-list-item-title>
            {{ link.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { navLinks } from "@/utils/links";

const filteredLinks = computed(() => navLinks.slice(1));
const {
  mdAndUp,
  // lgAndUp
} = useDisplay();
const drawer = ref<boolean>(false);
// const items = [
//   { title: "Dashboard", icon: "mdi-view-dashboard" },
//   { title: "Account", icon: "mdi-account-box" },
//   { title: "Settings", icon: "mdi-cog" },
// ];
</script>
