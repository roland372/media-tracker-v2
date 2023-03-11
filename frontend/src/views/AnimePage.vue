<template>
  <HeaderComponent title="Anime">header</HeaderComponent>
  <StatsComponent media="Anime" />
  <MediaComponent title="All Anime" all-media />
  <MediaComponent title="Recent Anime" />
  <MediaComponent title="Favourite Anime" />
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import StatsComponent from "@/components/StatsComponent.vue";
import MediaComponent from "@/components/MediaComponent.vue";
</script>
