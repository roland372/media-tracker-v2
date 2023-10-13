<template>
  <section class="d-md-flex align-center justify-space-between mb-2">
    <div>
      <ButtonIcon
        @click="handleDisplayClick"
        color="indigo"
        :icon="displayFlag === 'table' ? 'mdi-view-grid' : 'mdi-table'"
        icon-size="25"
      />
      <ButtonIcon
        @click="handleOpenSettingsModal"
        class="ms-2"
        color="grey-darken-3"
        icon="mdi-cog"
        icon-size="25"
      />
    </div>
    <div class="d-flex align-center flex-wrap">
      <ButtonText
        @click="handleFilterClear"
        class="ma-1"
        color="primary"
        :text="
          mediaType === EMediaType.BOOK ||
          mediaType === EMediaType.CHARACTER ||
          mediaType === EMediaType.GAME ||
          mediaType === EMediaType.MOVIE
            ? `All ${mediaType}s`
            : `All ${mediaType}`
        "
      />
      <ButtonText
        v-for="(status, index) in mediaStatus()"
        @click="handleStatusClick(status.status)"
        class="ma-1"
        :color="status.color"
        :key="index"
        :text="status.status"
      />
    </div>
  </section>
  <section class="mb-3">
    <v-text-field
      v-model="mediaSearch"
      @click:clear="handleSearchClear"
      @input="handleMediaSearch"
      clearable
      class="text-color"
      density="compact"
      hide-details="auto"
      :label="`${
        mediaType === EMediaType.ANIME
          ? `Search for an ${mediaType}`
          : `Search for a ${mediaType}`
      }`"
      variant="outlined"
    />
  </section>
  <v-dialog v-if="settingsModal" v-model="settingsModal" max-width="300"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Select sorting options
      </div>
      <v-card-text class="d-sm-flex justify-space-between ms-n1">
        <div>
          <strong> Sort by </strong>
          <v-radio-group v-model="sortingOptions.sortField" class="ms-n3">
            <!--? ANIME -->
            <div v-if="props.mediaType === EMediaType.ANIME">
              <v-radio label="Progress" value="episodesMin" />
              <v-radio label="Rating" value="rating" />
              <v-radio label="Status" value="status" />
              <v-radio label="Title" value="title" />
              <v-radio label="Type" value="type" />
              <v-radio label="Created At" value="createdAt" />
              <v-radio label="Updated At" value="updatedAt" />
            </div>

            <!--? BOOKS -->
            <div v-if="props.mediaType === EMediaType.BOOK">
              <v-radio label="Author" value="author" />
              <v-radio label="Genre" value="genre" />
              <v-radio label="Pages" value="pages" />
              <v-radio label="Rating" value="rating" />
              <v-radio label="Status" value="status" />
              <v-radio label="Title" value="title" />
              <v-radio label="Created At" value="createdAt" />
              <v-radio label="Updated At" value="updatedAt" />
            </div>

            <!--? CHARACTERS -->
            <div v-if="props.mediaType === EMediaType.CHARACTER">
              <v-radio label="Gender" value="gender" />
              <v-radio label="Hair Color" value="hairColor" />
              <v-radio label="Name" value="name" />
              <v-radio label="Series" value="series" />
              <v-radio label="Source" value="source" />
              <v-radio label="Created At" value="createdAt" />
              <v-radio label="Updated At" value="updatedAt" />
            </div>

            <!--? GAMES -->
            <div v-if="props.mediaType === EMediaType.GAME">
              <v-radio label="Playtime" value="playtime" />
              <v-radio label="Rating" value="rating" />
              <v-radio label="Status" value="status" />
              <v-radio label="Title" value="title" />
              <v-radio label="Type" value="type" />
              <v-radio label="Created At" value="createdAt" />
              <v-radio label="Updated At" value="updatedAt" />
            </div>

            <!--? MANGA -->
            <div v-if="props.mediaType === EMediaType.MANGA">
              <v-radio label="Chapters" value="chaptersMin" />
              <v-radio label="Rating" value="rating" />
              <v-radio label="Status" value="status" />
              <v-radio label="Title" value="title" />
              <v-radio label="Type" value="type" />
              <v-radio label="Volumes" value="volumesMin" />
              <v-radio label="Created At" value="createdAt" />
              <v-radio label="Updated At" value="updatedAt" />
            </div>

            <!--? MOVIES -->
            <div v-if="props.mediaType === EMediaType.MOVIE">
              <v-radio label="Episodes" value="episodesMin" />
              <v-radio label="Rating" value="rating" />
              <v-radio label="Seasons" value="seasonsMin" />
              <v-radio label="Status" value="status" />
              <v-radio label="Title" value="title" />
              <v-radio label="Type" value="type" />
              <v-radio label="Created At" value="createdAt" />
              <v-radio label="Updated At" value="updatedAt" />
            </div>
          </v-radio-group>
        </div>
        <div>
          <strong>Order</strong>
          <v-radio-group v-model="sortingOptions.sortOrder" class="ms-n3">
            <v-radio label="Ascending" value="asc" />
            <v-radio label="Descending" value="desc" />
          </v-radio-group>
        </div>
      </v-card-text>
      <v-card-actions class="ms-2 mb-2 mt-n7">
        <ButtonText
          @click="handleSortMedia"
          color="green"
          text="Confirm"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import { TSortingOptions } from "@/types";
import {
  EAnimeStatus,
  EBookStatus,
  ECharacterSource,
  EGameStatus,
  EMangaStatus,
  EMediaType,
  EMovieStatus,
} from "../../../../common/types";

interface IDisplayFilterSearchPanelProps {
  displayFlag: string;
  mediaType: EMediaType;
}

const emit = defineEmits(["display", "search", "sort", "filter"]);
const props = defineProps<IDisplayFilterSearchPanelProps>();

const mediaSearch = ref<string | undefined>("");
const settingsModal = ref<boolean>(false);
const sortingOptions = ref<TSortingOptions>({
  sortField: props.mediaType === EMediaType.CHARACTER ? "name" : "title",
  sortOrder: "asc",
});

const mediaStatus = () => {
  let statusArr = [];

  switch (props.mediaType) {
    case EMediaType.ANIME:
      statusArr = [
        { status: EAnimeStatus.WATCHING, color: "green" },
        { status: EAnimeStatus.COMPLETED, color: "blue" },
        { status: EAnimeStatus.ON_HOLD, color: "yellow" },
        { status: EAnimeStatus.DROPPED, color: "red" },
        { status: EAnimeStatus.PLAN_TO_WATCH, color: "white" },
      ];
      break;
    case EMediaType.BOOK:
      statusArr = [
        { status: EBookStatus.READING, color: "green" },
        { status: EBookStatus.COMPLETED, color: "blue" },
        { status: EBookStatus.ON_HOLD, color: "yellow" },
        { status: EBookStatus.DROPPED, color: "red" },
        { status: EBookStatus.PLAN_TO_READ, color: "white" },
      ];
      break;
    case EMediaType.CHARACTER:
      statusArr = [
        { status: ECharacterSource.ANIME, color: "green" },
        { status: ECharacterSource.GAME, color: "blue" },
        { status: ECharacterSource.MANGA, color: "yellow" },
      ];
      break;
    case EMediaType.GAME:
      statusArr = [
        { status: EGameStatus.PLAYING, color: "green" },
        { status: EGameStatus.COMPLETED, color: "blue" },
        { status: EGameStatus.ON_HOLD, color: "yellow" },
        { status: EGameStatus.DROPPED, color: "red" },
        { status: EGameStatus.PLAN_TO_PLAY, color: "white" },
      ];
      break;
    case EMediaType.MANGA:
      statusArr = [
        { status: EMangaStatus.READING, color: "green" },
        { status: EMangaStatus.COMPLETED, color: "blue" },
        { status: EMangaStatus.ON_HOLD, color: "yellow" },
        { status: EMangaStatus.DROPPED, color: "red" },
        { status: EMangaStatus.PLAN_TO_READ, color: "white" },
      ];
      break;
    case EMediaType.MOVIE:
      statusArr = [
        { status: EMovieStatus.WATCHING, color: "green" },
        { status: EMovieStatus.COMPLETED, color: "blue" },
        { status: EMovieStatus.ON_HOLD, color: "yellow" },
        { status: EMovieStatus.DROPPED, color: "red" },
        { status: EMovieStatus.PLAN_TO_WATCH, color: "white" },
      ];
      break;
  }

  return statusArr;
};

const handleDisplayClick = () => {
  emit("display");
  emit("search", "");
  emit("filter", "");
};

const handleFilterClear = () => emit("filter", "");
const handleMediaSearch = () => emit("search", mediaSearch.value);
const handleOpenSettingsModal = () => {
  settingsModal.value = !settingsModal.value;
};
const handleSearchClear = () => emit("search", "");
const handleSortMedia = () => {
  emit("sort", sortingOptions.value);
  // console.log("Sort By:", sortingOptions.value.sortField);
  // console.log("Sort Order:", sortingOptions.value.sortOrder);
  settingsModal.value = !settingsModal.value;
};
const handleStatusClick = (
  status:
    | EAnimeStatus
    | EBookStatus
    | ECharacterSource
    | EGameStatus
    | EMangaStatus
    | EMovieStatus
) => emit("filter", status);
</script>
