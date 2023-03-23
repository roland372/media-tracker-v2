<template>
  <v-img @click="dialog = !dialog" class="rounded" cover :src="media.imageURL">
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
import { TAnime, TCharacter, TGame, TManga, EMediaType } from "@/types";

interface IMediaCardProps {
  media: TCharacter | TAnime | TGame | TManga;
  mediaType: EMediaType;
}

const props = defineProps<IMediaCardProps>();

const dialog = ref<boolean>(false);
const displayImageText = (media: TAnime | TManga | TGame | TCharacter) => {
  let imageText = "";
  if (props.mediaType === EMediaType.ANIME) {
    imageText = `Ep ${(media as TAnime).episodesMin} / ${
      (media as TAnime).episodesMax
    }`;
  } else if (props.mediaType === EMediaType.MANGA) {
    imageText = `Ch ${(media as TManga).chaptersMin} / ${
      (media as TManga).chaptersMax
    } \n Vol ${(media as TManga).volumesMin} / ${(media as TManga).volumesMax}`;
  } else if (props.mediaType === EMediaType.GAME) {
    imageText = `Ep ${(media as TGame).playtime} hours`;
  }
  return imageText;
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
  left: 5px;
  top: 5px;
}

.image-title-overlay {
  position: absolute;
  left: 5px;
  bottom: 5px;
}
</style>
