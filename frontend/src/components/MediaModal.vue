<template>
  <v-dialog width="auto">
    <template v-slot:default>
      <v-card>
        <v-toolbar color="primary" :title="title" />
        <v-card-text>
          <v-card-text v-if="mediaType === 'anime'" class="">
            <div><b>Type:</b> {{ media.type }}</div>
            <div><b>Link:</b> {{ media.link1Name }}</div>
            <div>
              <b>Episodes:</b> {{ media.episodesMin }} /
              {{ media.episodesMax }}
            </div>
            <div><b>Rating:</b> {{ media.rating }}</div>
            <div><b>Status:</b> {{ media.status }}</div>
          </v-card-text>
          <v-card-text v-if="mediaType === 'manga'" class="">
            <div><b>Type:</b> Manga</div>
          </v-card-text>
          <v-card-text v-if="mediaType === 'games'" class="">
            <div><b>Type:</b> Games</div>
          </v-card-text>
          <v-card-text v-if="mediaType === 'characters'" class="">
            <div><b>Type:</b> Characters</div>
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <ButtonText color="blue" text="View" />
          <ButtonText color="green" text="Edit" />
          <ButtonText color="red" text="Delete" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import ButtonText from "./ButtonText.vue";

defineProps({
  media: { type: Object, required: true },
  mediaType: { type: String, required: true },
  title: { type: String, required: true },
});
</script>
