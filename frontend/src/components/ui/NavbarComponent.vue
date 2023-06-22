<template>
  <v-layout class="mb-10 pb-10">
    <!--? NAVBAR -->
    <v-app-bar app class="nav-bg-color">
      <v-btn :active="false" :ripple="false" size="x-large" to="/">
        <v-app-bar-title class="mx-n3 text-color">
          Media-Tracker
        </v-app-bar-title>
      </v-btn>

      <template v-slot:append>
        <section v-if="!mdAndUp" class="d-flex align-center justify-center">
          <router-link to="/profile">
            <img
              alt="Avatar"
              class="rounded-circle ms-2 mt-2"
              :src="userFromDB?.profileImg"
              style="width: 40px"
            />
          </router-link>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            color="white"
            :ripple="false"
            size="x-large"
            variant="plain"
          />
        </section>
      </template>
      <v-list
        class="d-flex justify-start align-center bg-secondary-medium"
        v-if="mdAndUp"
      >
        <v-list-item
          v-for="(link, index) in filteredLinks"
          :key="index"
          active-class="active-nav-link-color"
          class="text-color"
          :to="link.url"
        >
          {{ link.text }}
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <router-link v-if="mdAndUp" to="/profile">
        <img
          alt="Avatar"
          class="rounded-circle ms-2 mt-2"
          :src="userFromDB?.profileImg"
          style="width: 48px"
        />
      </router-link>
    </v-app-bar>

    <!--? SIDEBAR -->
    <v-navigation-drawer
      v-model="drawer"
      app
      class="bg-primary-medium text-color"
      location="end"
      temporary
    >
      <v-list-item :active="false" class="sidebar-header-bg-color" to="/">
        <v-list-item-title class="text-h6 py-3">Home</v-list-item-title>
      </v-list-item>
      <div class="sidebar-item-bg-color">
        <v-list color="blue" dense nav>
          <v-list-item
            v-for="(link, index) in filteredLinks"
            :key="index"
            active-class="active-sidebar-link-color"
            class="sidebar-bg-color"
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
import { useDisplay } from "vuetify";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { navLinks } from "@/utils/links";
import { EUserRole } from "@/types";

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
  // lgAndUp,
} = useDisplay();
const drawer = ref<boolean>(false);
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
