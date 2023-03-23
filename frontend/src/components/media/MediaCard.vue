<template>
  <v-img @click="dialog = !dialog" class="rounded" cover :src="media.imageURL">
    <div class="image-overlay-icon">
      <v-icon v-if="media.favourites" color="yellow-accent-4" icon="mdi-star" />
    </div>
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
import { TAnime, TCharacter, TGame, TManga, EMediaType } from "@/types";

interface IMediaCardProps {
  media: TCharacter | TAnime | TGame | TManga;
  mediaType: EMediaType;
}

defineProps<IMediaCardProps>();

const dialog = ref<boolean>(false);

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
  right: 0;
  top: 0;
}
</style>
