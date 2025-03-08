<template>
  <v-dialog width="auto">
    <template v-slot:default>
      <v-card max-width="450" class="pb-2">
        <div class="bg-primary-light text-color px-5 py-3 text-h6">
          {{ title }}
        </div>
        <div class="d-sm-flex align-start">
          <v-img class="rounded ms-2 me-2 me-sm-0 mt-2" cover min-height="200px" min-width="150px"
            :src="media.imageURL || placeholderImg" />
          <v-card-text>
            <!--? ANIME -->
            <section v-if="mediaType === EMediaType.ANIME">
              <div><b>Type:</b> {{ (media as TAnime).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="media.link" target="_blank">{{ media.linkName }}</a>
              </div>
              <div>
                <b>Episodes:</b> {{ (media as TAnime).episodesMin }} /
                {{ (media as TAnime).episodesMax }}
              </div>
              <div><b>Rating:</b> {{ (media as TAnime).rating }}</div>
              <div><b>Status:</b> {{ (media as TAnime).status }}</div>
            </section>

            <!--? BOOKS -->
            <section v-if="mediaType === EMediaType.BOOK">
              <div><b>Author:</b> {{ (media as TBook).author }}</div>
              <div>
                <b>Link: </b>
                <a :href="media.link" target="_blank">{{ media.linkName }}</a>
              </div>
              <div><b>Genre:</b> {{ (media as TBook).genre }}</div>
              <div><b>Pages:</b> {{ (media as TBook).pages }}</div>
              <div><b>Rating:</b> {{ (media as TBook).rating }}</div>
              <div><b>Status:</b> {{ (media as TBook).status }}</div>
            </section>

            <!--? CHARACTERS -->
            <section v-if="mediaType === EMediaType.CHARACTER">
              <div>
                <b>Link: </b>
                <a :href="media.link" target="_blank">{{ media.linkName }}</a>
              </div>
              <div><b>Source:</b> {{ (media as TCharacter).source }}</div>
              <div><b>Gender:</b> {{ (media as TCharacter).gender }}</div>
              <div><b>Series:</b> {{ (media as TCharacter).series }}</div>
              <div>
                <b>Hair Color:</b> {{ (media as TCharacter).hairColor }}
              </div>
            </section>

            <!--? GAMES -->
            <section v-if="mediaType === EMediaType.GAME">
              <div><b>Type:</b> {{ (media as TGame).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="media.link" target="_blank">{{ media.linkName }}</a>
              </div>
              <div><b>Playtime:</b> {{ (media as TGame).playtime }} hours</div>
              <div><b>Rating:</b> {{ (media as TGame).rating }}</div>
              <div><b>Status:</b> {{ (media as TGame).status }}</div>
            </section>

            <!--? MANGA -->
            <section v-if="mediaType === EMediaType.MANGA">
              <div><b>Type:</b> {{ (media as TManga).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="media.link" target="_blank">{{ media.linkName }}</a>
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
            </section>

            <!--? MOVIES -->
            <section v-if="mediaType === EMediaType.MOVIE">
              <div><b>Type:</b> {{ (media as TMovie).type }}</div>
              <div>
                <b>Link: </b>
                <a :href="media.link" target="_blank">{{ media.linkName }}</a>
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
            </section>

            <section>
              <div><b>Created At:</b> {{ media.createdAt }}</div>
              <div><b>Updated At:</b> {{ media.updatedAt }}</div>
            </section>
          </v-card-text>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { placeholderImg } from "@/utils/mediaUtils";
import {
  TAnime,
  TBook,
  TCharacter,
  TGame,
  TManga,
  TMedia,
  TMovie,
} from "@/types";
import { EMediaType } from "@/types";

interface IMediaModalProps {
  media: TMedia;
  mediaType: EMediaType;
  title: string;
}

defineProps<IMediaModalProps>();
</script>
