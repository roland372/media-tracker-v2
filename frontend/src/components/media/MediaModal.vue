<template>
  <v-dialog width="auto">
    <template v-slot:default>
      <v-card max-width="250">
        <div class="bg-primary px-5 py-3 text-h6">{{ title }}</div>
        <v-card-text class="ms-n5 my-n3">
          <!--? ANIME -->
          <v-card-text v-if="mediaType === EMediaType.ANIME">
            <div><b>Type:</b> {{ (media as TAnime).type }}</div>
            <div><b>Link:</b> {{ (media as TAnime).link1Name }}</div>
            <div>
              <b>Episodes:</b> {{ (media as TAnime).episodesMin }} /
              {{ (media as TAnime).episodesMax }}
            </div>
            <div><b>Rating:</b> {{ (media as TAnime).rating }}</div>
            <div><b>Status:</b> {{ (media as TAnime).status }}</div>
          </v-card-text>
          <!--? MANGA -->
          <v-card-text v-if="mediaType === EMediaType.MANGA">
            <div><b>Type:</b> {{ (media as TManga).type }}</div>
            <div><b>Link:</b> {{ (media as TManga).link1Name }}</div>
            <div>
              <b>Chapters:</b> {{ (media as TManga).chaptersMin }} /
              {{ (media as TManga).chaptersMax }}
            </div>
            <div>
              <b>Volumes:</b> {{ (media as TManga).volumesMin }} /
              {{ (media as TManga).volumesMax }}
            </div>
            <div><b>Rating:</b> {{ (media as TManga).rating }}</div>
            <div><b>Status:</b> {{ (media as TManga).status }}</div>
          </v-card-text>
          <!--? GAMES -->
          <v-card-text v-if="mediaType === EMediaType.GAME">
            <div><b>Type:</b> {{ (media as TGame).type }}</div>
            <div><b>Link:</b> {{ (media as TGame).link1Name }}</div>
            <div><b>Playtime:</b> {{ (media as TGame).playtime }} hours</div>
            <div><b>Rating:</b> {{ (media as TGame).rating }}</div>
            <div><b>Status:</b> {{ (media as TGame).status }}</div>
          </v-card-text>
          <!--? CHARACTERS -->
          <v-card-text v-if="mediaType === EMediaType.CHARACTER">
            <div><b>Link:</b> {{ (media as TCharacter).link1Name }}</div>
            <div><b>Source:</b> {{ (media as TCharacter).source }}</div>
            <div><b>Gender:</b> {{ (media as TCharacter).gender }}</div>
            <div><b>Series:</b> {{ (media as TCharacter).series }}</div>
            <div><b>Hair Color:</b> {{ (media as TCharacter).hairColor }}</div>
          </v-card-text>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around">
          <ButtonText
            @click="viewClick"
            color="blue"
            text="View"
            variant="flat"
          />
          <ButtonText
            @click="editClick"
            color="green"
            text="Edit"
            variant="flat"
          />
          <ButtonText
            @click="deleteClick"
            color="red"
            text="Delete"
            variant="flat"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import { EMediaType, TAnime, TCharacter, TGame, TManga } from "@/types";

interface IMediaModalProps {
  editClick: () => void;
  deleteClick: () => void;
  media: TAnime | TManga | TGame | TCharacter;
  mediaType: EMediaType;
  title: string;
  viewClick: () => void;
}

defineProps<IMediaModalProps>();
</script>
