<template>
  <v-navigation-drawer
    class="nd-bg-color text-color mt- rounded"
    expand-on-hover
    permanent
    rail
  >
    <v-list-item
      class="pa-2"
      :prepend-avatar="require('@/../public/img/icons/mstile-150x150.png')"
      title="Media-Tracker"
      to="/"
    >
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item
      class="pa-2"
      :prepend-avatar="userFromDB?.profileImg"
      :subtitle="userFromDB?.email"
      :title="userFromDB?.username"
      to="/profile"
    >
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(link, index) in filteredLinks"
        :key="index"
        :color="link.color"
        :to="link.url"
      >
        <div class="d-flex align-center">
          <v-icon class="pe-1" :color="link.color">{{ link.icon }}</v-icon>
          <div class="ps-5">
            {{ link.text }}
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { computed } from "vue";
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
</script>
<style>
.nd-bg-color {
  background-color: var(--bg-secondary-medium);
  border-right: 3px solid var(--bg-secondary-light);
}
</style>
