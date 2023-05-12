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
        @click:clear="handleClearCharacterSearch"
        @keydown.enter="handleFetchCharacterSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for a Character"
        variant="outlined"
      />
    </section>
    <section v-if="fetchedCharacters?.length" class="grid-container pt-3">
      <section v-for="(item, index) in fetchedCharacters" :key="index">
        <v-img
          @click="handleOpenFetchCharacterModal(item)"
          :src="item.images.jpg.image_url"
          class="rounded media-img-card"
          cover
        />
      </section>
    </section>
  </HeaderComponent>
  <FetchedMediaModal
    v-if="fetchedCharacterModal"
    @close-modal="handleCloseFetchCharacterModal"
    :show-modal="fetchedCharacterModal"
    :title="fetchedSingleCharacter?.name as string"
    :submit-click="handleFetchedCharacterSubmit"
    :view-more-click="handleFetchedCharacterViewMore"
  >
    <section>
      <div>
        <b>About:</b>
        {{
          fetchedSingleCharacter &&
          fetchedSingleCharacter.about &&
          fetchedSingleCharacter?.about?.length > 200
            ? `${fetchedSingleCharacter?.about?.slice(0, 200)}...`
            : fetchedSingleCharacter?.about
        }}
      </div>
    </section>
  </FetchedMediaModal>
  <StatsComponent
    :media="EMediaType.CHARACTER"
    :media-type="EMediaType.CHARACTER"
    :progress="progress"
    :status="source"
    :stats="stats"
  />
  <MediaTable
    v-if="displayFlag === 'table'"
    :media="orderBy(filteredCharacters, ['name'], ['asc'])"
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
    :media="orderBy(filteredCharacters, ['name'], ['asc'])"
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
    :media="
      orderBy(filter(characters, { favourites: true }), ['name'], ['asc'])
    "
    title="Favourite Characters"
  />
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import MediaTable from "@/components/media/MediaTable.vue";
import FetchedMediaModal from "@/components/media/FetchedMediaModal.vue";

import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import {
  calculatePercentage,
  filterGameSource,
  fetchMediaURL,
} from "@/utils/mediaUtils";
import {
  EMediaType,
  ECharacterSource,
  TCharacterInput,
  ECharacterGender,
} from "@/types";
import { filter, orderBy } from "lodash";
import { CommonCharacterData } from "@tutkli/jikan-ts";

interface CommonCharacterDataWithAbout extends CommonCharacterData {
  about?: string;
}

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const fetchedCharacterModal = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.CHARACTER + " Added");
const mediaStore = useMediaStore();
const { submitAddCharacter } = mediaStore;
const { characters } = storeToRefs(mediaStore);
const fetchedCharacters = ref<CommonCharacterDataWithAbout[]>();
const fetchedSingleCharacter = ref<CommonCharacterDataWithAbout>();

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

const handleFetchCharacterSearch = async () => {
  if (characterFetchSearch.value.length) {
    const fetchCharacters = await fetch(
      fetchMediaURL(
        "characters",
        characterFetchSearch.value,
        "favorites",
        "desc"
      )
    ).then((res) => res.json());

    fetchedCharacters.value = fetchCharacters.data;
  } else {
    console.log("empty search");
  }
};

const handleClearCharacterSearch = () => {
  characterFetchSearch.value = "";
  fetchedCharacters.value = [];
};

const handleOpenFetchCharacterModal = (item: CommonCharacterDataWithAbout) => {
  fetchedSingleCharacter.value = item;
  fetchedCharacterModal.value = !fetchedCharacterModal.value;
};
const handleCloseFetchCharacterModal = () => {
  fetchedCharacterModal.value = !fetchedCharacterModal.value;
};
const handleFetchedCharacterViewMore = () => {
  window.open(fetchedSingleCharacter.value?.url, "_blank");
};

const handleFetchedCharacterSubmit = async () => {
  const fetchedCharacter: TCharacterInput = reactive({
    favourites: false,
    gender: ECharacterGender.FEMALE,
    hairColor: "",
    imageURL: fetchedSingleCharacter.value?.images.jpg.image_url,
    link1: fetchedSingleCharacter.value?.url,
    link1Name: "MAL",
    mal_id: fetchedSingleCharacter.value?.mal_id as number,
    name: fetchedSingleCharacter.value?.name as string,
    series: "",
    source: ECharacterSource.ANIME,
  });

  await submitAddCharacter(fetchedCharacter);
  fetchedCharacterModal.value = false;
  snackbar.value = !snackbar.value;
};
</script>
