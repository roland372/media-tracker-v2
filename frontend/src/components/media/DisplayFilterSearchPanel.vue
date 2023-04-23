<template>
  <section class="d-md-flex align-center justify-space-between mb-2">
    <div>
      <ButtonIcon
        @click="handleDisplayClick"
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
          mediaType === EMediaType.CHARACTER || mediaType === EMediaType.GAME
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
      density="compact"
      hide-details="auto"
      :label="`Search for ${mediaType}`"
      variant="outlined"
    />
  </section>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import {
  EAnimeStatus,
  ECharacterSource,
  EGameStatus,
  EMangaStatus,
  EMediaType,
  TAnime,
  TCharacter,
  TGame,
  TManga,
} from "@/types";
import ButtonText from "@/components/ui/ButtonText.vue";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";

interface IDisplayFilterSearchPanelProps {
  displayFlag: string;
  media: TCharacter[] | TAnime[] | TGame[] | TManga[];
  mediaSearch?: string;
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
  }

  return statusArr;
};

const handleStatusClick = (
  status: EAnimeStatus | EMangaStatus | EGameStatus | ECharacterSource
) => emit("filter", status);

const handleDisplayClick = () => emit("display");
const handleMediaSearch = () => emit("search", mediaSearch.value);
const handleSearchClear = () => emit("search", "");
const handleFilterClear = () => emit("filter", "");
</script>
