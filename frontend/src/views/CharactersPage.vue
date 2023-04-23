<template>
  <HeaderComponent title="Characters">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.CHARACTER"
      :title="`Add ${EMediaType.CHARACTER}`"
    />
    <SnackbarComponent
      v-if="snackbar"
      :snackbar="snackbar"
      :text="snackbarText"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText @click="formDialog = !formDialog" text="Add Character" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="characterFetchSearch"
        @click:append-inner="handleFetchCharacterSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for Character"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent
    :media="EMediaType.CHARACTER"
    :media-type="EMediaType.CHARACTER"
    :progress="progress"
    :status="source"
    :stats="stats"
  />
  <MediaTable
    v-if="displayFlag === 'table'"
    :media="filteredCharacters"
    :media-type="EMediaType.CHARACTER"
    title="All Characters"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleCharacterFilter"
      @search="handleCharacterSearch"
      :display-flag="displayFlag"
      :media-type="EMediaType.CHARACTER"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="filteredCharacters"
    :media-type="EMediaType.CHARACTER"
    title="All Characters"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleCharacterFilter"
      @search="handleCharacterSearch"
      :display-flag="displayFlag"
      :media-type="EMediaType.CHARACTER"
    />
  </MediaComponent>
  <MediaComponent
    :media="orderBy(characters, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.CHARACTER"
    title="Recent Characters"
  />
  <MediaComponent
    :media-type="EMediaType.CHARACTER"
    :media="filter(characters, { favourites: true })"
    title="Favourite Characters"
  />
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import MediaTable from "@/components/media/MediaTable.vue";

import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { calculatePercentage } from "@/utils/mediaUtils";
import { filterGameSource } from "@/utils/mediaUtils";
import { EMediaType, ECharacterSource } from "@/types";
import { filter, orderBy } from "lodash";

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.CHARACTER + " Added");
const mediaStore = useMediaStore();
const { characters } = storeToRefs(mediaStore);

const characterFetchSearch = ref<string>("");
const searchTerm = ref<string>("");
const characterFilter = ref<string>("");

const filteredCharacters = computed(() =>
  characters.value.filter((el) => {
    const searchTermMatch = el.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const sourceMatch =
      characterFilter.value === "" || el.source === characterFilter.value;
    return searchTermMatch && sourceMatch;
  })
);

const totalCharacters = computed(() => characters.value.length);
const anime = computed(() => filterGameSource(characters, "anime").length);
const game = computed(() => filterGameSource(characters, "game").length);
const manga = computed(() => filterGameSource(characters, "manga").length);
const favourites = computed(
  () => characters.value.filter((characters) => characters.favourites).length
);

const handleFetchCharacterSearch = () => {
  console.log(characterFetchSearch.value);
};

const progress = computed(() => [
  {
    color: "green",
    value: calculatePercentage(anime.value, totalCharacters.value),
  },
  {
    color: "blue",
    value: calculatePercentage(game.value, totalCharacters.value),
  },
  {
    color: "yellow",
    value: calculatePercentage(manga.value, totalCharacters.value),
  },
]);

const source = computed(() => [
  { color: "green", name: ECharacterSource.ANIME, value: anime },
  { color: "blue", name: ECharacterSource.GAME, value: game },
  { color: "yellow", name: ECharacterSource.MANGA, value: manga },
]);

const stats = computed(() => [
  { name: "Total Characters", value: totalCharacters.value },
  { name: "Favourites", value: favourites },
]);

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = !snackbar.value;
};

const handleChangeDisplayFlag = () => {
  if (displayFlag.value === "table") {
    displayFlag.value = "grid";
  } else if (displayFlag.value === "grid") {
    displayFlag.value = "table";
  }
};

const handleCharacterSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);
const handleCharacterFilter = (emittedValue: string) =>
  (characterFilter.value = emittedValue);

onMounted(() => {
  // console.log("CHARACTERS MOUNTED");
});
</script>
