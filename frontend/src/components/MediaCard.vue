<template>
  <v-img @click="dialog = !dialog" class="rounded" cover :src="media.imageURL">
    <div class="image-overlay-icon">
      <v-icon v-if="media.favourites" color="yellow-accent-4" icon="mdi-star" />
    </div>
    <MediaModal
      v-if="dialog"
      v-model="dialog"
      :media="media"
      :media-type="mediaType"
      :title="media.title"
    />
  </v-img>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import MediaModal from "./MediaModal.vue";

defineProps({
  media: { type: Object, required: true },
  mediaType: { type: String, required: true },
});
const dialog = ref<boolean>(false);
</script>
<style scoped>
.image-overlay-icon {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

<!-- <v-card-actions class="justify-end">
  <v-btn variant="text" @click="dialog = false">Close</v-btn>
</v-card-actions> -->

<!-- <v-dialog v-model="dialog" width="auto">
  <template v-slot:default>
    <v-card>
      <v-toolbar color="primary" :title="props.media.title" />
      <v-card-text class="">
        <div><b>Type:</b> {{ props.media.type }}</div>
        <div><b>Link:</b> {{ props.media.link1Name }}</div>
        <div>
          <b>Episodes:</b> {{ props.media.episodesMin }} /
          {{ props.media.episodesMax }}
        </div>
        <div><b>Rating:</b> {{ props.media.rating }}</div>
        <div><b>Status:</b> {{ props.media.status }}</div>
      </v-card-text>
      <v-card-actions>
        <ButtonText color="blue" text="View" />
        <ButtonText color="green" text="Edit" />
        <ButtonText color="red" text="Delete" />
      </v-card-actions>
    </v-card>
  </template>
</v-dialog> -->
