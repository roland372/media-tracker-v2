<template>
  <v-dialog width="auto">
    <template v-slot:default>
      <v-card max-width="250">
        <v-toolbar color="primary" :title="title" />
        <v-card-text>
          <!--? ANIME -->
          <v-card-text v-if="mediaType === 'anime'">
            <div><b>Type:</b> {{ media.type }}</div>
            <div><b>Link:</b> {{ media.link1Name }}</div>
            <div>
              <b>Episodes:</b> {{ media.episodesMin }} /
              {{ media.episodesMax }}
            </div>
            <div><b>Rating:</b> {{ media.rating }}</div>
            <div><b>Status:</b> {{ media.status }}</div>
          </v-card-text>
          <!--? MANGA -->
          <v-card-text v-if="mediaType === 'manga'">
            <div><b>Type:</b> {{ media.type }}</div>
            <div><b>Link:</b> {{ media.link1Name }}</div>
            <div>
              <b>Chapters:</b> {{ media.chaptersMin }} /
              {{ media.chaptersMax }}
            </div>
            <div>
              <b>Volumes:</b> {{ media.volumesMin }} /
              {{ media.volumesMax }}
            </div>
            <div><b>Rating:</b> {{ media.rating }}</div>
            <div><b>Status:</b> {{ media.status }}</div>
          </v-card-text>
          <!--? GAMES -->
          <v-card-text v-if="mediaType === 'game'">
            <div><b>Type:</b> {{ media.type }}</div>
            <div><b>Link:</b> {{ media.link1Name }}</div>
            <div><b>Playtime:</b> {{ media.playtime }} hours</div>
            <div><b>Rating:</b> {{ media.rating }}</div>
            <div><b>Status:</b> {{ media.status }}</div>
          </v-card-text>
          <!--? CHARACTERS -->
          <v-card-text v-if="mediaType === 'character'">
            <div><b>Link:</b> {{ media.link1Name }}</div>
            <div><b>Source:</b> {{ media.source }}</div>
            <div><b>Gender:</b> {{ media.gender }}</div>
            <div><b>Series:</b> {{ media.series }}</div>
            <div><b>Hair Color:</b> {{ media.hairColor }}</div>
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <ButtonText color="blue" text="View" @click="viewClick" />
          <ButtonText color="green" text="Edit" @click="editClick" />
          <ButtonText color="red" text="Delete" @click="deleteClick" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import ButtonText from "@/components/ui/ButtonText.vue";

defineProps({
  editClick: { type: Function },
  deleteClick: { type: Function },
  media: { type: Object, required: true },
  mediaType: { type: String, required: true },
  title: { type: String, required: true },
  viewClick: { type: Function },
});
</script>
