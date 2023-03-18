<template>
  <HeaderComponent title="Manga">
    <section class="d-sm-flex align-center justify-center">
      <ButtonText text="Add Manga" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="mangaSearch"
        @click:append-inner="handleMangaSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for Manga"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent media="Manga" />
  <!-- <MediaComponent title="All Manga" all-media /> -->
  <MediaComponent
    all-media
    :media="sortedManga"
    media-type="manga"
    title="Recent Manga"
  />
  <!-- <MediaComponent :media="favouriteManga" title="Favourite Manga" /> -->
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { sortMediaByDate, favouriteMedia } from "@/utils/mediaUtils";

const mediaStore = useMediaStore();
const { manga } = storeToRefs(mediaStore);

const mangaSearch = ref<string>("");
const sortedManga = sortMediaByDate(manga);
const favouriteManga = favouriteMedia(manga);

const handleMangaSearch = () => {
  console.log(mangaSearch.value);
};

onMounted(() => {
  // console.log("Manga MOUNTED");
});
</script>
