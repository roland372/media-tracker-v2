<template>
  <v-layout class="mb-10 pb-10">
    <!--? NAVBAR -->
    <v-app-bar app class="nav-bg-color">
      <v-btn :active="false" :ripple="false" size="x-large" to="/">
        <v-app-bar-title class="mx-n3 text-color">
          <div class="d-flex align-center">
            <v-img
              class="me-1"
              :src="require('@/../public/img/icons/mstile-150x150.png')"
              style="width: 32px"
            >
            </v-img>
            <div>Media-Tracker</div>
          </div>
        </v-app-bar-title>
      </v-btn>

      <template v-slot:append>
        <section class="d-flex align-center justify-center">
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
        <v-list-item-title class="text-h6 py-3">
          <div class="d-flex align-center">
            <v-icon
              class="me-2"
              :color="navLinks[0].color"
              :icon="navLinks[0].icon"
              size="large"
            />
            {{ navLinks[0].text }}
          </div>
        </v-list-item-title>
      </v-list-item>
      <div class="sidebar-item-bg-color">
        <v-list color="blue" dense nav>
          <v-list-item
            v-for="(link, index) in filteredLinks"
            :key="index"
            :color="link.color"
            class="sidebar-bg-color"
            :to="link.url"
          >
            <v-list-item-title>
              <div class="d-flex align-center">
                <v-icon
                  class="me-2"
                  :color="link.color"
                  :icon="link.icon"
                  size="x-large"
                />
                {{ link.text }}
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { navLinks } from "@/utils/links";
import { EUserRole } from "../../../../common/types";

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
