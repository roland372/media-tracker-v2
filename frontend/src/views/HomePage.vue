<template>
  <HeaderComponent
    title="Welcome to Media-Tracker
"
  >
    <section class="d-sm-flex align-center justify-start">
      <ButtonText text="Add Media" />
    </section>
  </HeaderComponent>
  <MediaComponent
    :media="recentAnime"
    :media-type="EMediaType.ANIME"
    title="Recent Anime"
  />
  <MediaComponent
    :media="recentCharacters"
    :media-type="EMediaType.CHARACTER"
    title="Recent Characters"
  />
  <MediaComponent
    :media="recentGames"
    :media-type="EMediaType.GAME"
    title="Recent Games"
  />
  <MediaComponent
    :media="recentManga"
    :media-type="EMediaType.MANGA"
    title="Recent Manga"
  />
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { TAnime, TCharacter, TGame, TManga, EMediaType } from "@/types";
import { sortMediaByDate } from "@/utils/mediaUtils";

const mediaStore = useMediaStore();
const { anime, characters, games, manga } = storeToRefs(mediaStore);

const recentAnime: TAnime[] = sortMediaByDate(anime);
const recentCharacters: TCharacter[] = sortMediaByDate(characters);
const recentGames: TGame[] = sortMediaByDate(games);
const recentManga: TManga[] = sortMediaByDate(manga);
</script>
