<template>
  <CardComponent :title="title">
    <slot></slot>
    <h3
      v-if="!media.length && mediaType === EMediaType.ANIME"
      class="text-color"
    >
      Not found any items.
    </h3>
    <v-table
      v-else-if="media.length && mediaType === EMediaType.ANIME"
      density="compact"
      fixed-header
      height="500px"
      class="bg-blue"
      ><thead class="text-left">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th width="15%">Title</th>
          <th>Rating</th>
          <th>Type</th>
          <th>Progress</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <tr v-for="(anime, index) in (media as TAnime[])" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-img :src="anime.imageURL" max-height="92px" /></td>
          <td>{{ anime.title }}</td>
          <td>{{ anime.rating }}</td>
          <td>{{ anime.type }}</td>
          <td>{{ anime.episodesMin }} / {{ anime.episodesMax }}</td>
          <td>
            {{
              new Date(anime.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <h3
      v-if="!media.length && mediaType === EMediaType.GAME"
      class="text-color"
    >
      Not found any items.
    </h3>
    <v-table
      v-else-if="media.length && mediaType === EMediaType.GAME"
      density="compact"
      fixed-header
      height="500px"
      ><thead class="text-left">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th width="15%">Title</th>
          <th>Type</th>
          <th>Playtime</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <tr v-for="(game, index) in (media as TGame[])" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-img :src="game.imageURL" max-height="92px" /></td>
          <td>{{ game.title }}</td>
          <td>{{ game.type }}</td>
          <td>{{ game.playtime }}</td>
          <td>
            {{
              new Date(game.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <h3
      v-if="!media.length && mediaType === EMediaType.MANGA"
      class="text-color"
    >
      Not found any items.
    </h3>
    <v-table
      v-else-if="media.length && mediaType === EMediaType.MANGA"
      density="compact"
      fixed-header
      height="500px"
      ><thead class="text-left">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th width="15%">Title</th>
          <th>Rating</th>
          <th>Type</th>
          <th>Chapters</th>
          <th>Volumes</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <tr v-for="(manga, index) in (media as TManga[])" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-img :src="manga.imageURL" max-height="92px" /></td>
          <td>{{ manga.title }}</td>
          <td>{{ manga.rating }}</td>
          <td>{{ manga.type }}</td>
          <td>{{ manga.chaptersMin }} / {{ manga.chaptersMax }}</td>
          <td>{{ manga.volumesMin }} / {{ manga.volumesMax }}</td>
          <td>
            {{
              new Date(manga.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <h3
      v-if="!media.length && mediaType === EMediaType.CHARACTER"
      class="text-color"
    >
      Not found any items.
    </h3>
    <v-table
      v-else-if="media.length && mediaType === EMediaType.CHARACTER"
      density="compact"
      fixed-header
      height="500px"
      ><thead class="text-left">
        <tr>
          <th>#</th>
          <th>Image</th>
          <th width="15%">Name</th>
          <th>Source</th>
          <th>Gender</th>
          <th>Series</th>
          <th>Hair Color</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <tr v-for="(character, index) in (media as TCharacter[])" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-img :src="character.imageURL" max-height="92px" /></td>
          <td>{{ character.name }}</td>
          <td>{{ character.source }}</td>
          <td>{{ character.gender }}</td>
          <td>{{ character.series }}</td>
          <td>{{ character.hairColor }}</td>
          <td>
            {{
              new Date(character.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import CardComponent from "@/components/media/CardComponent.vue";
import { EMediaType, TAnime, TCharacter, TGame, TManga } from "@/types";

interface IMediaTableProps {
  media: TAnime[] | TManga[] | TGame[] | TCharacter[];
  mediaType: EMediaType;
  title: string;
}

defineProps<IMediaTableProps>();
</script>
<style>
th {
  background-color: var(--bg-primary-dark) !important;
  color: var(--text-color) !important;
}

table,
v-table,
.v-table__wrapper {
  background-color: var(--bg-secondary-medium);
  color: var(--text-color);
}
</style>
