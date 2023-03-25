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
      v-if="
        mediaType !== EMediaType.CHARACTER && mediaType !== EMediaType.MANGA
      "
      class="bg-black image-text-overlay"
      color="white"
      size="x-small"
      text-color="white"
      :text="displayImageText(media)"
    />
    <!-- <ChipComponent
      v-if="mediaType === EMediaType.MANGA"
      class="bg-black image-manga-chapters"
      color="white"
      size="x-small"
      text-color="white"
      :text="`Ch ${(media as TManga).chaptersMin} / ${(media as TManga).chaptersMax
        }`"
    />
    <ChipComponent
      v-if="mediaType === EMediaType.MANGA"
      class="bg-black image-manga-volumes"
      color="white"
      size="x-small"
      text-color="white"
      :text="`Vol ${(media as TManga).volumesMin} / ${(media as TManga).volumesMax}`"
    /> -->
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
      :edit-click="handleEditClick"
      :media="media"
      :media-type="mediaType"
      :title="mediaType === EMediaType.CHARACTER ? (media as TCharacter).name : (media as TAnime | TGame | TManga).title"
      :view-click="handleViewClick"
      v-model="dialog"
    />
    <EditFormComponent
      v-if="formDialog"
      v-model="formDialog"
      :media="media"
      :media-type="mediaType"
      :title="`Edit ${mediaType}`"
    />
  </v-img>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import MediaModal from "@/components/media/MediaModal.vue";
import ChipComponent from "../ui/ChipComponent.vue";
import EditFormComponent from "./EditFormComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import {
  TAnime,
  TCharacter,
  TGame,
  TManga,
  EMediaType,
  EAnimeStatus,
  EMangaStatus,
  EGameStatus,
  ECharacterSource,
} from "@/types";

const mediaStore = useMediaStore();
const { submitDeleteAnime } = mediaStore;

interface IMediaCardProps {
  media: TCharacter | TAnime | TGame | TManga;
  mediaType: EMediaType;
}

const props = defineProps<IMediaCardProps>();

const dialog = ref<boolean>(false);
const formDialog = ref<boolean>(false);

const displayImageText = (media: TAnime | TManga | TGame | TCharacter) => {
  let imageText = "";
  switch (props.mediaType) {
    case EMediaType.ANIME:
      imageText = `Ep ${(media as TAnime).episodesMin} / ${
        (media as TAnime).episodesMax
      }`;
      break;
    case EMediaType.GAME:
      imageText = `${(media as TGame).playtime} hours`;
      break;
    default:
      break;
  }
  return imageText;
};

const statusColor = (media: TAnime | TManga | TGame | TCharacter) => {
  let color = "";
  if ((media as TCharacter).source) {
    switch ((media as TCharacter).source) {
      case ECharacterSource.ANIME:
        color = "green";
        break;
      case ECharacterSource.MANGA:
        color = "yellow";
        break;
      case ECharacterSource.GAME:
        color = "blue";
        break;
    }
  } else {
    switch ((media as TAnime | TManga | TGame).status) {
      case EAnimeStatus.WATCHING:
      case EMangaStatus.READING:
      case EGameStatus.PLAYING:
        color = "green";
        break;
      case EAnimeStatus.COMPLETED:
      case EMangaStatus.COMPLETED:
      case EGameStatus.COMPLETED:
        color = "blue";
        break;
      case EAnimeStatus.ON_HOLD:
      case EMangaStatus.ON_HOLD:
      case EGameStatus.ON_HOLD:
        color = "yellow";
        break;
      case EAnimeStatus.DROPPED:
      case EMangaStatus.DROPPED:
      case EGameStatus.DROPPED:
        color = "red";
        break;
      case EAnimeStatus.PLAN_TO_WATCH:
      case EMangaStatus.PLAN_TO_READ:
      case EGameStatus.PLAN_TO_PLAY:
        color = "white";
        break;
    }
  }
  return color;
};

const handleViewClick = () => {
  dialog.value = !dialog.value;
};
const handleEditClick = () => {
  dialog.value = !dialog.value;
  formDialog.value = !formDialog.value;
};
const handleDeleteClick = async () => {
  switch (props.mediaType) {
    case EMediaType.ANIME:
      await submitDeleteAnime(props.media._id);
      break;
    case EMediaType.MANGA:
      console.log("manga");
      break;
  }
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

.image-manga-chapters {
  position: absolute;
  left: 0;
  top: 0;
}

.image-manga-volumes {
  position: absolute;
  left: 0;
  top: 20px;
}
</style>
