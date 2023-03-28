<template>
  <v-dialog max-width="500">
    <template v-slot:default>
      <v-card max-width="500">
        <div class="bg-primary px-5 py-3 text-h6">{{ title }}</div>
        <v-card-text class="">
          <!--? ANIME -->
          <section v-if="props.mediaType === EMediaType.ANIME" class="mb-n12">
            <v-text-field
              v-model="newAnime.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Anime Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="newAnime.type"
              class="mb-n3"
              :items="animeType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="newAnime.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newAnime.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newAnime.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newAnime.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newAnime.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="newAnime.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="newAnime.status"
              class="mb-n3"
              :items="animeStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Episodes</div>
              <v-text-field
                v-model.number="newAnime.episodesMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="newAnime.episodesMax"
                class="mx-2"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="newAnime.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitAddAnime" text="Add" />
          </section>

          <!--? MANGA -->
          <section v-if="props.mediaType === EMediaType.MANGA" class="mb-n12">
            <v-text-field
              v-model="newManga.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Manga Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="newManga.type"
              class="mb-n3"
              :items="mangaType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="newManga.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newManga.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newManga.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newManga.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newManga.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="newManga.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="newManga.status"
              class="mb-n3"
              :items="mangaStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Chapters</div>
              <v-text-field
                v-model.number="newManga.chaptersMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="newManga.chaptersMax"
                class="mx-2"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center mt-3">
              <div class="pe-2">Volumes</div>
              <v-text-field
                v-model.number="newManga.volumesMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="newManga.volumesMax"
                class="mx-2"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="newManga.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitAddManga" text="Add" />
          </section>

          <!--? GAMES -->
          <section v-if="props.mediaType === EMediaType.GAME" class="mb-n12">
            <v-text-field
              v-model="newGame.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Game Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="newGame.type"
              class="mb-n3"
              :items="gameType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="newGame.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newGame.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newGame.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newGame.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newGame.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="newGame.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="newGame.status"
              class="mb-n3"
              :items="gameStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Playtime (Hours)</div>
              <v-text-field
                v-model.number="newGame.playtime"
                density="compact"
                hide-details="auto"
                label="Playtime"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="newGame.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitAddGame" text="Add" />
          </section>

          <!--? CHARACTERS -->
          <section
            v-if="props.mediaType === EMediaType.CHARACTER"
            class="mb-n12"
          >
            <v-text-field
              v-model="newCharacter.name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Character Name"
              :rules="[(val) => !!val || 'Name is required.']"
              variant="outlined"
            />
            <v-select
              v-model="newCharacter.source"
              class="mb-n3"
              :items="characterSource"
              label="Select Source"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="newCharacter.gender"
              class="mb-n3"
              :items="characterGender"
              label="Select Gender"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="newCharacter.series"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Series Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newCharacter.hairColor"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Hair Color"
              variant="outlined"
            />
            <v-text-field
              v-model="newCharacter.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link Name"
              variant="outlined"
            />
            <v-text-field
              v-model="newCharacter.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link URL"
              variant="outlined"
            />
            <v-text-field
              v-model="newCharacter.imageURL"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="newCharacter.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitAddCharacter" text="Add" />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around"> </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, reactive } from "vue";
import {
  mediaRating,
  animeType,
  animeStatus,
  mangaType,
  mangaStatus,
  gameType,
  gameStatus,
  characterSource,
  characterGender,
} from "@/utils/mediaUtils";
import ButtonText from "../ui/ButtonText.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import {
  EAnimeStatus,
  EAnimeType,
  ECharacterGender,
  ECharacterSource,
  EGameStatus,
  EGameType,
  EMangaStatus,
  EMangaType,
  EMediaType,
  TAnimeInput,
  TCharacterInput,
  TGameInput,
  TMangaInput,
} from "@/types";

interface IFormComponentProps {
  mediaType: EMediaType;
  title: string;
}

const props = defineProps<IFormComponentProps>();
const emit = defineEmits(["submit"]);

const mediaStore = useMediaStore();
const { submitAddAnime, submitAddManga, submitAddGame, submitAddCharacter } =
  mediaStore;

const newAnime: TAnimeInput = reactive({
  episodesMax: 0,
  episodesMin: 0,
  favourites: false,
  imageURL: "",
  link1: "",
  link1Name: "MAL",
  link2: "",
  link2Name: "",
  rating: 0,
  status: EAnimeStatus.PLAN_TO_WATCH,
  title: "",
  type: EAnimeType.TV_SHOW,
});

const newManga: TMangaInput = reactive({
  chaptersMax: 0,
  chaptersMin: 0,
  favourites: false,
  imageURL: "",
  link1: "",
  link1Name: "MAL",
  link2: "",
  link2Name: "",
  rating: 0,
  status: EMangaStatus.PLAN_TO_READ,
  title: "",
  type: EMangaType.MANGA,
  volumesMax: 0,
  volumesMin: 0,
});

const newGame: TGameInput = reactive({
  favourites: false,
  imageURL: "",
  link1: "",
  link1Name: "Link",
  link2: "",
  link2Name: "",
  playtime: 0,
  rating: 0,
  status: EGameStatus.PLAN_TO_PLAY,
  title: "",
  type: EGameType.GAME,
});

const newCharacter: TCharacterInput = reactive({
  favourites: false,
  gender: ECharacterGender.FEMALE,
  hairColor: "",
  imageURL: "",
  link1: "",
  link1Name: "Link",
  name: "",
  series: "",
  source: ECharacterSource.ANIME,
});

const handleSubmitAddAnime = async () => {
  await submitAddAnime(newAnime);
  emit("submit");
};
const handleSubmitAddManga = async () => {
  await submitAddManga(newManga);
  emit("submit");
};
const handleSubmitAddGame = async () => {
  await submitAddGame(newGame);
  emit("submit");
};
const handleSubmitAddCharacter = async () => {
  await submitAddCharacter(newCharacter);
  emit("submit");
};
</script>
