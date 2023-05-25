<template>
  <section class="d-md-flex align-center justify-space-between mb-2">
    <div>
      <ButtonIcon
        @click="handleDisplayClick"
        color="indigo"
        :icon="displayFlag === 'table' ? 'mdi-view-grid' : 'mdi-table'"
        icon-size="25"
      />
    </div>
    <div class="d-flex align-center flex-wrap">
      <ButtonText
        @click="handleFilterClear"
        class="ma-1"
        color="primary"
        :text="
          mediaType === EMediaType.CHARACTER ||
          mediaType === EMediaType.GAME ||
          mediaType === EMediaType.BOOK ||
          mediaType === EMediaType.MOVIE
            ? `All ${mediaType}s`
            : `All ${mediaType}`
        "
      />
      <ButtonText
        v-for="(status, index) in mediaStatus()"
        @click="handleStatusClick(status.status)"
        class="ma-1"
        :color="status.color"
        :key="index"
        :text="status.status"
      />
    </div>
  </section>
  <section class="mb-3">
    <v-text-field
      v-model="mediaSearch"
      @click:clear="handleSearchClear"
      @input="handleMediaSearch"
      clearable
      class="text-color"
      density="compact"
      hide-details="auto"
      :label="`${
        mediaType === EMediaType.ANIME
          ? `Search for an ${mediaType}`
          : `Search for a ${mediaType}`
      }`"
      variant="outlined"
    />
  </section>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import {
  EAnimeStatus,
  EBookStatus,
  ECharacterSource,
  EGameStatus,
  EMangaStatus,
  EMediaType,
  EMovieStatus,
} from "@/types";
import ButtonText from "@/components/ui/ButtonText.vue";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";

interface IDisplayFilterSearchPanelProps {
  displayFlag: string;
  mediaType: EMediaType;
}

const props = defineProps<IDisplayFilterSearchPanelProps>();
const emit = defineEmits(["display", "search", "filter"]);
const mediaSearch = ref<string | undefined>("");

const mediaStatus = () => {
  let statusArr = [];

  switch (props.mediaType) {
    case EMediaType.ANIME:
      // statusArr = [...new Set(media.map((el) => (el as TAnime).status))];
      statusArr = [
        { status: EAnimeStatus.WATCHING, color: "green" },
        { status: EAnimeStatus.COMPLETED, color: "blue" },
        { status: EAnimeStatus.ON_HOLD, color: "yellow" },
        { status: EAnimeStatus.DROPPED, color: "red" },
        { status: EAnimeStatus.PLAN_TO_WATCH, color: "white" },
      ];
      break;
    case EMediaType.MANGA:
      statusArr = [
        { status: EMangaStatus.READING, color: "green" },
        { status: EMangaStatus.COMPLETED, color: "blue" },
        { status: EMangaStatus.ON_HOLD, color: "yellow" },
        { status: EMangaStatus.DROPPED, color: "red" },
        { status: EMangaStatus.PLAN_TO_READ, color: "white" },
      ];
      break;
    case EMediaType.GAME:
      statusArr = [
        { status: EGameStatus.PLAYING, color: "green" },
        { status: EGameStatus.COMPLETED, color: "blue" },
        { status: EGameStatus.ON_HOLD, color: "yellow" },
        { status: EGameStatus.DROPPED, color: "red" },
        { status: EGameStatus.PLAN_TO_PLAY, color: "white" },
      ];
      break;
    case EMediaType.CHARACTER:
      statusArr = [
        { status: ECharacterSource.ANIME, color: "green" },
        { status: ECharacterSource.GAME, color: "blue" },
        { status: ECharacterSource.MANGA, color: "yellow" },
      ];
      break;
    case EMediaType.BOOK:
      statusArr = [
        { status: EBookStatus.READING, color: "green" },
        { status: EBookStatus.COMPLETED, color: "blue" },
        { status: EBookStatus.ON_HOLD, color: "yellow" },
        { status: EBookStatus.DROPPED, color: "red" },
        { status: EBookStatus.PLAN_TO_READ, color: "white" },
      ];
      break;
    case EMediaType.MOVIE:
      statusArr = [
        { status: EMovieStatus.WATCHING, color: "green" },
        { status: EMovieStatus.COMPLETED, color: "blue" },
        { status: EMovieStatus.ON_HOLD, color: "yellow" },
        { status: EMovieStatus.DROPPED, color: "red" },
        { status: EMovieStatus.PLAN_TO_WATCH, color: "white" },
      ];
      break;
  }

  return statusArr;
};

const handleStatusClick = (
  status:
    | EAnimeStatus
    | EMangaStatus
    | EGameStatus
    | ECharacterSource
    | EBookStatus
    | EMovieStatus
) => emit("filter", status);

const handleDisplayClick = () => {
  emit("display");
  emit("search", "");
  emit("filter", "");
};
const handleMediaSearch = () => emit("search", mediaSearch.value);
const handleSearchClear = () => emit("search", "");
const handleFilterClear = () => emit("filter", "");
</script>
