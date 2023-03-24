<template>
  <CardComponent title="Welcome to Media-Tracker">hello</CardComponent>
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
import CardComponent from "@/components/media/CardComponent.vue";
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
