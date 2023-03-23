<template>
  <v-img
    @click="dialog = !dialog"
    class="rounded"
    cover
    :src="media.imageURL"
    :style="{
      borderRight: `5px ${statusColor(media)} solid`,
      borderBottom: `5px ${statusColor(media)} solid`,
    }"
  >
    <div class="image-overlay-icon">
      <v-icon v-if="media.favourites" color="yellow-accent-4" icon="mdi-star" />
    </div>
    <ChipComponent
      class="bg-black image-text-overlay"
      color="white"
      size="x-small"
      text-color="white"
      :text="displayImageText(media)"
    />
    <ChipComponent
      class="bg-black image-title-overlay"
      color="white"
      size="x-small"
      text-color="white"
      :text="mediaType === EMediaType.CHARACTER ? (media as TCharacter).name : (media as TAnime | TGame | TManga).title"
    />
    <MediaModal
      v-if="dialog"
      :delete-click="handleDeleteClick"
      :edit-click="handleEdicClick"
      :media="media"
      :media-type="mediaType"
      :title="mediaType === EMediaType.CHARACTER ? (media as TCharacter).name : (media as TAnime | TGame | TManga).title"
      :view-click="handleViewClick"
      v-model="dialog"
    />
  </v-img>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import MediaModal from "@/components/media/MediaModal.vue";
import ChipComponent from "../ui/ChipComponent.vue";
import {
  TAnime,
  TCharacter,
  TGame,
  TManga,
  EMediaType,
  EAnimeStatus,
  EMangaStatus,
  EGameStatus,
} from "@/types";

interface IMediaCardProps {
  media: TCharacter | TAnime | TGame | TManga;
  mediaType: EMediaType;
}

const props = defineProps<IMediaCardProps>();

const dialog = ref<boolean>(false);
const displayImageText = (media: TAnime | TManga | TGame | TCharacter) => {
  let imageText = "";
  switch (props.mediaType) {
    case EMediaType.ANIME:
      imageText = `Ep ${(media as TAnime).episodesMin} / ${
        (media as TAnime).episodesMax
      }`;
      break;
    case EMediaType.MANGA:
      imageText = `Ch ${(media as TManga).chaptersMin} / ${
        (media as TManga).chaptersMax
      } \n Vol ${(media as TManga).volumesMin} / ${
        (media as TManga).volumesMax
      }`;
      break;
    case EMediaType.GAME:
      imageText = `Ep ${(media as TGame).playtime} hours`;
      break;
    default:
      break;
  }
  return imageText;
};

const statusColor = (media: TAnime | TManga | TGame | TCharacter) => {
  let color = "";
  switch ((media as TAnime | TGame | TManga).status) {
    case EAnimeStatus.WATCHING || EMangaStatus.READING || EGameStatus.PLAYING:
      color = "green";
      break;
    case EAnimeStatus.COMPLETED ||
      EMangaStatus.COMPLETED ||
      EGameStatus.COMPLETED:
      color = "blue";
      break;
    case EAnimeStatus.ON_HOLD || EMangaStatus.ON_HOLD || EGameStatus.ON_HOLD:
      color = "yellow";
      break;
    case EAnimeStatus.DROPPED || EMangaStatus.DROPPED || EGameStatus.DROPPED:
      color = "red";
      break;
    case EAnimeStatus.PLAN_TO_WATCH ||
      EMangaStatus.PLAN_TO_READ ||
      EGameStatus.PLAN_TO_PLAY:
      color = "white";
      break;
  }
  return color;
};

const handleViewClick = () => {
  dialog.value = !dialog.value;
};
const handleEdicClick = () => {
  dialog.value = !dialog.value;
};
const handleDeleteClick = () => {
  dialog.value = !dialog.value;
};
</script>
<style scoped>
.image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}

.image-text-overlay {
  position: absolute;
  left: 0;
  top: 0;
}

.image-title-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
