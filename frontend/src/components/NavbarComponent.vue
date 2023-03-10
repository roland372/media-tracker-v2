<template>
  <v-layout>
    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
      <v-app-bar-title>Media-Tracker</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-title class="text-h6"> Learning Vuetify</v-list-item-title>
        <v-list-item-subtitle> Using Navigation drawers</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref<boolean>(false);
const items = [
  { title: "Dashboard", icon: "mdi-view-dashboard" },
  { title: "Account", icon: "mdi-account-box" },
  { title: "Settings", icon: "mdi-cog" },
];
</script>

<!-- <template>
  <v-app-bar color="blue" class="flex-grow-0" app dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-app-bar-title>Media-Tracker</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer app v-model="drawer">
    <v-list-item>
      <v-list-item-title class="text-h6"> Learning Vuetify</v-list-item-title>
      <v-list-item-subtitle> Using Navigation drawers</v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref<boolean>(false);
const items = [
  { title: "Dashboard", icon: "mdi-view-dashboard" },
  { title: "Account", icon: "mdi-account-box" },
  { title: "Settings", icon: "mdi-cog" },
];
</script> -->
