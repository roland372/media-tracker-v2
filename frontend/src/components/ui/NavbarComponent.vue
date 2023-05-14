<template>
  <v-layout class="mb-10 pb-10">
    <v-app-bar app class="nav-bg-color">
      <template v-slot:append>
        <router-link to="/profile">
          <img
            v-if="!mdAndUp"
            alt="Avatar"
            class="rounded-circle ms-2 mt-2"
            :src="userFromDB?.profileImg"
            style="width: 40px"
          />
        </router-link>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          v-if="!mdAndUp"
          color="white"
          size="x-large"
          :ripple="false"
          variant="plain"
        />
      </template>
      <v-btn to="/" :active="false" :ripple="false" size="x-large">
        <v-app-bar-title class="mx-n3 text-color">
          Media-Tracker
        </v-app-bar-title>
      </v-btn>
      <v-list
        class="d-flex justify-start align-center bg-secondary-medium"
        v-if="mdAndUp"
      >
        <v-list-item
          active-class="active-nav-link-color"
          class="text-color"
          :to="link.url"
          v-for="(link, index) in filteredLinks"
          :key="index"
        >
          {{ link.text }}
        </v-list-item>
        <router-link to="/profile">
          <img
            alt="Avatar"
            class="rounded-circle ms-2 mt-2"
            :src="userFromDB?.profileImg"
            style="width: 48px"
          />
        </router-link>
      </v-list>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="bg-primary-medium text-color"
      location="end"
      temporary
    >
      <v-list-item to="/" class="sidebar-header-bg-color">
        <v-list-item-title class="text-h6 py-3">Home</v-list-item-title>
      </v-list-item>
      <div class="sidebar-item-bg-color">
        <v-list dense nav color="blue">
          <v-list-item
            active-class="active-sidebar-link-color"
            class="sidebar-bg-color"
            v-for="(link, index) in filteredLinks"
            :key="index"
            :to="link.url"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { EUserRole } from "@/types";
import { useDisplay } from "vuetify";
import { navLinks } from "@/utils/links";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";

const mediaStore = useMediaStore();
const { userFromDB } = storeToRefs(mediaStore);

const filteredLinks = computed(() =>
  navLinks
    .filter((link) => {
      if (userFromDB.value?.role === EUserRole.ADMIN) {
        return link.route;
      } else {
        return link.route !== EUserRole.ADMIN;
      }
    })
    .slice(1)
);

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
<style scoped>
.nav-bg-color {
  background-color: var(--bg-secondary-medium);
  border-bottom: 3px solid var(--bg-secondary-light);
}

.sidebar-bg-color {
  background-color: var(--bg-secondary-medium);
}

.sidebar-header-bg-color {
  background-color: var(--bg-primary-dark);
}

.sidebar-item-bg-color {
  background-color: var(--bg-primary-medium);
}

.active-nav-link-color {
  background-color: var(--bg-primary-light);
  border-radius: 5%;
}
.active-sidebar-link-color {
  background-color: var(--bg-primary-light);
}
</style>
