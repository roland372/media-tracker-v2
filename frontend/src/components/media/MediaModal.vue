<template>
  <v-dialog width="auto">
    <template v-slot:default>
      <v-card max-width="350">
        <div class="bg-primary-light text-color px-5 py-3 text-h6">
          {{ title }}
        </div>
        <div class="d-sm-flex align-start">
          <v-img
            class="rounded ms-2 me-2 me-sm-0 mt-2"
            cover
            min-height="200px"
            min-width="150px"
            :src="media.imageURL || placeholderImg"
          />
          <v-card-text class="ms-n3 my-n4 mb-n6">
            <!--? ANIME -->
            <v-card-text v-if="mediaType === EMediaType.ANIME">
              <div><b>Type:</b> {{ (media as TAnime).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="(media as TAnime).link" target="_blank">{{
                  (media as TAnime).linkName
                }}</a>
              </div>
              <div>
                <b>Episodes:</b> {{ (media as TAnime).episodesMin }} /
                {{ (media as TAnime).episodesMax }}
              </div>
              <div><b>Rating:</b> {{ (media as TAnime).rating }}</div>
              <div><b>Status:</b> {{ (media as TAnime).status }}</div>
            </v-card-text>

            <!--? BOOKS -->
            <v-card-text v-if="mediaType === EMediaType.BOOK">
              <div><b>Author:</b> {{ (media as TBook).author }}</div>
              <div>
                <b>Link: </b>
                <a :href="(media as TBook).link" target="_blank">{{
                  (media as TBook).linkName
                }}</a>
              </div>
              <div><b>Genre:</b> {{ (media as TBook).genre }}</div>
              <div><b>Pages:</b> {{ (media as TBook).pages }}</div>
              <div><b>Rating:</b> {{ (media as TBook).rating }}</div>
              <div><b>Status:</b> {{ (media as TBook).status }}</div>
            </v-card-text>

            <!--? CHARACTERS -->
            <v-card-text v-if="mediaType === EMediaType.CHARACTER">
              <div>
                <b>Link: </b>
                <a :href="(media as TCharacter).link" target="_blank">{{
                  (media as TCharacter).linkName
                }}</a>
              </div>
              <div><b>Source:</b> {{ (media as TCharacter).source }}</div>
              <div><b>Gender:</b> {{ (media as TCharacter).gender }}</div>
              <div><b>Series:</b> {{ (media as TCharacter).series }}</div>
              <div>
                <b>Hair Color:</b> {{ (media as TCharacter).hairColor }}
              </div>
            </v-card-text>

            <!--? GAMES -->
            <v-card-text v-if="mediaType === EMediaType.GAME">
              <div><b>Type:</b> {{ (media as TGame).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="(media as TGame).link" target="_blank">{{
                  (media as TGame).linkName
                }}</a>
              </div>
              <div><b>Playtime:</b> {{ (media as TGame).playtime }} hours</div>
              <div><b>Rating:</b> {{ (media as TGame).rating }}</div>
              <div><b>Status:</b> {{ (media as TGame).status }}</div>
            </v-card-text>

            <!--? MANGA -->
            <v-card-text v-if="mediaType === EMediaType.MANGA">
              <div><b>Type:</b> {{ (media as TManga).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="(media as TManga).link" target="_blank">{{
                  (media as TManga).linkName
                }}</a>
              </div>
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

            <!--? MOVIES -->
            <v-card-text v-if="mediaType === EMediaType.MOVIE">
              <div><b>Type:</b> {{ (media as TMovie).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="(media as TMovie).link" target="_blank">{{
                  (media as TMovie).linkName
                }}</a>
              </div>
              <div v-if="(media as TMovie).type === 'TV-Show'">
                <div>
                  <b>Episodes:</b> {{ (media as TMovie).episodesMin }} /
                  {{ (media as TMovie).episodesMax }}
                </div>
                <div>
                  <b>Seasons:</b> {{ (media as TMovie).seasonsMin }} /
                  {{ (media as TMovie).seasonsMax }}
                </div>
              </div>
              <div><b>Rating:</b> {{ (media as TMovie).rating }}</div>
              <div><b>Status:</b> {{ (media as TMovie).status }}</div>
            </v-card-text>
          </v-card-text>
        </div>

        <v-card-actions class="d-flex justify-start">
          <!-- <ButtonText
            @click="viewClick"
            color="indigo"
            text="View"
            variant="flat"
          /> -->
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
import { placeholderImg } from "@/utils/mediaUtils";
import ButtonText from "@/components/ui/ButtonText.vue";
import { TAnime, TBook, TCharacter, TGame, TManga, TMovie } from "@/types";
import { EMediaType } from "../../../../common/types";

interface IMediaModalProps {
  media: TAnime | TManga | TGame | TCharacter | TBook | TMovie;
  mediaType: EMediaType;
  title: string;
  deleteClick: () => void;
  editClick: () => void;
  viewClick: () => void;
}

defineProps<IMediaModalProps>();
</script>
