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
        v-model="characterSearch"
        @click:append-inner="handleCharacterSearch"
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
    :status="status"
    :stats="stats"
  />
  <MediaComponent
    all-media
    :media="allCharacters"
    :media-type="EMediaType.CHARACTER"
    title="All Characters"
  />
  <MediaComponent
    :media="recentCharacters.slice(0, 20)"
    :media-type="EMediaType.CHARACTER"
    title="Recent Characters"
  />
  <MediaComponent
    :media-type="EMediaType.CHARACTER"
    :media="favouriteCharacters"
    title="Favourite Characters"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import {
  sortMediaByDate,
  favouriteMedia,
  sortArrayByPropertyASC,
  calculatePercentage,
} from "@/utils/mediaUtils";
import { filterGameSource } from "@/utils/mediaUtils";
import { EMediaType, TCharacter } from "@/types";

const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.CHARACTER + " Added");
const mediaStore = useMediaStore();
const { characters } = storeToRefs(mediaStore);

const characterSearch = ref<string>("");
const allCharacters: TCharacter[] = sortArrayByPropertyASC(characters, "name");
const recentCharacters: TCharacter[] = sortMediaByDate(characters);
const favouriteCharacters: TCharacter[] = favouriteMedia(characters);

const anime = ref(filterGameSource(characters, "anime").length);
const game = ref(filterGameSource(characters, "game").length);
const manga = ref(filterGameSource(characters, "manga").length);
const favourites = ref(
  characters.value.filter((characters) => characters.favourites).length
);

const handleCharacterSearch = () => {
  console.log(characterSearch.value);
};

const progress = [
  {
    color: "green",
    value: calculatePercentage(anime.value, characters.value.length),
  },
  {
    color: "blue",
    value: calculatePercentage(game.value, characters.value.length),
  },
  {
    color: "yellow",
    value: calculatePercentage(manga.value, characters.value.length),
  },
];

const status = [
  { color: "green", name: "Anime", value: anime },
  { color: "blue", name: "Game", value: game },
  { color: "yellow", name: "Manga", value: manga },
];

const stats = [
  { name: "Total Characters", value: characters.value.length },
  { name: "Favourites", value: favourites },
];

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = !snackbar.value;
};

onMounted(() => {
  // console.log("CHARACTERS MOUNTED");
});
</script>
