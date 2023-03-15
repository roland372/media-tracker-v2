<template>
  <HeaderComponent title="Anime">
    <section class="d-sm-flex align-center justify-center">
      <ButtonText text="Add Anime" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="animeSearch"
        @click:append-inner="handleAnimeSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for Anime"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent media="Anime" />
  <!-- <MediaComponent title="All Anime" all-media /> -->
  <MediaComponent
    all-media
    :media="sortedAnime"
    media-type="anime"
    title="Recent Anime"
  />
  <!-- <MediaComponent :media="favouriteAnime" title="Favourite Anime" /> -->
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ButtonText from "@/components/ButtonText.vue";
import StatsComponent from "@/components/StatsComponent.vue";
import MediaComponent from "@/components/MediaComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { sortMediaByDate, favouriteMedia } from "@/utils/mediaUtils";

const mediaStore = useMediaStore();
const { anime } = storeToRefs(mediaStore);

const animeSearch = ref<string>("");
const sortedAnime = sortMediaByDate(anime);
const favouriteAnime = favouriteMedia(anime);

const handleAnimeSearch = () => {
  console.log(animeSearch.value);
};

onMounted(() => {
  // console.log("ANIME MOUNTED");
});
</script>
