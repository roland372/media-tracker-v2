<template>
  <v-dialog max-width="500">
    <template v-slot:default>
      <v-card max-width="500">
        <div class="bg-primary px-5 py-3 text-h6">{{ title }}</div>
        <v-card-text class="">
          <!--? ANIME -->
          <section v-if="props.mediaType === EMediaType.ANIME" class="mb-n12">
            <v-text-field
              v-model="animeRef.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Anime Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="animeRef.type"
              class="mb-n3"
              :items="animeType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="animeRef.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="animeRef.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="animeRef.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="animeRef.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="animeRef.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="animeRef.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="animeRef.status"
              class="mb-n3"
              :items="animeStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Episodes</div>
              <v-text-field
                v-model.number="animeRef.episodesMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="animeRef.episodesMax"
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
              <v-checkbox v-model="animeRef.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitEditAnime" text="Edit" />
          </section>

          <!--? MANGA -->
          <section v-if="props.mediaType === EMediaType.MANGA" class="mb-n12">
            <v-text-field
              v-model="mangaRef.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Manga Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="mangaRef.type"
              class="mb-n3"
              :items="mangaType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="mangaRef.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="mangaRef.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="mangaRef.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="mangaRef.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="mangaRef.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="mangaRef.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="mangaRef.status"
              class="mb-n3"
              :items="mangaStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Chapters</div>
              <v-text-field
                v-model.number="mangaRef.chaptersMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="mangaRef.chaptersMax"
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
                v-model.number="mangaRef.volumesMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="mangaRef.volumesMax"
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
              <v-checkbox v-model="mangaRef.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitEditManga" text="Edit" />
          </section>

          <!--? GAMES -->
          <section v-if="props.mediaType === EMediaType.GAME" class="mb-n12">
            <v-text-field
              v-model="gameRef.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Game Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="gameRef.type"
              class="mb-n3"
              :items="gameType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="gameRef.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="gameRef.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="gameRef.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="gameRef.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="gameRef.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="gameRef.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="gameRef.status"
              class="mb-n3"
              :items="gameStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Playtime (Hours)</div>
              <v-text-field
                v-model.number="gameRef.playtime"
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
              <v-checkbox v-model="gameRef.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitEditGame" text="Edit" />
          </section>

          <!--? CHARACTERS -->
          <section
            v-if="props.mediaType === EMediaType.CHARACTER"
            class="mb-n12"
          >
            <v-text-field
              v-model="characterRef.name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Character Name"
              :rules="[(val) => !!val || 'Name is required.']"
              variant="outlined"
            />
            <v-select
              v-model="characterRef.source"
              class="mb-n3"
              :items="characterSource"
              label="Select Source"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="characterRef.gender"
              class="mb-n3"
              :items="characterGender"
              label="Select Gender"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="characterRef.series"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Series Name"
              variant="outlined"
            />
            <v-text-field
              v-model="characterRef.hairColor"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Hair Color"
              variant="outlined"
            />
            <v-text-field
              v-model="characterRef.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link Name"
              variant="outlined"
            />
            <v-text-field
              v-model="characterRef.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link URL"
              variant="outlined"
            />
            <v-text-field
              v-model="characterRef.imageURL"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="characterRef.favourites" hide-details />
            </section>
            <ButtonText @click="handleSubmitEditCharacter" text="Edit" />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around"> </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref, reactive } from "vue";
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
  TAnime,
  TCharacter,
  TGame,
  TManga,
  TAnimeInput,
  EMediaType,
  TMangaInput,
  TGameInput,
  TCharacterInput,
} from "@/types";

interface IFormComponentProps {
  media: TAnime | TManga | TGame | TCharacter;
  mediaType: EMediaType;
  title: string;
}

const props = defineProps<IFormComponentProps>();

const mediaStore = useMediaStore();
const {
  submitEditAnime,
  submitEditManga,
  submitEditGame,
  submitEditCharacter,
} = mediaStore;

const animeRef = ref<TAnime>(props.media as TAnime);
const mangaRef = ref<TManga>(props.media as TManga);
const gameRef = ref<TGame>(props.media as TGame);
const characterRef = ref<TCharacter>(props.media as TCharacter);

const handleSubmitEditAnime = async () => {
  const updatedAnime: TAnimeInput = reactive({
    episodesMax: animeRef.value.episodesMax,
    episodesMin: animeRef.value.episodesMin,
    favourites: animeRef.value.favourites,
    imageURL: animeRef.value.imageURL,
    lastModified: Date.now(),
    link1: animeRef.value.link1,
    link1Name: animeRef.value.link1Name,
    link2: animeRef.value.link2,
    link2Name: animeRef.value.link2Name,
    rating: animeRef.value.rating,
    status: animeRef.value.status,
    title: animeRef.value.title,
    type: animeRef.value.type,
  });
  await submitEditAnime(animeRef.value._id, updatedAnime);
};

const handleSubmitEditManga = async () => {
  const updatedManga: TMangaInput = reactive({
    chaptersMax: mangaRef.value.chaptersMax,
    chaptersMin: mangaRef.value.chaptersMin,
    favourites: mangaRef.value.favourites,
    imageURL: mangaRef.value.imageURL,
    lastModified: Date.now(),
    link1: mangaRef.value.link1,
    link1Name: mangaRef.value.link1Name,
    link2: mangaRef.value.link2,
    link2Name: mangaRef.value.link2Name,
    rating: mangaRef.value.rating,
    status: mangaRef.value.status,
    title: mangaRef.value.title,
    type: mangaRef.value.type,
    volumesMax: mangaRef.value.volumesMax,
    volumesMin: mangaRef.value.volumesMin,
  });
  await submitEditManga(mangaRef.value._id, updatedManga);
};

const handleSubmitEditGame = async () => {
  const updatedGame: TGameInput = reactive({
    favourites: gameRef.value.favourites,
    imageURL: gameRef.value.imageURL,
    link1: gameRef.value.link1,
    link1Name: gameRef.value.link1Name,
    link2: gameRef.value.link2,
    link2Name: gameRef.value.link2Name,
    playtime: gameRef.value.playtime,
    rating: gameRef.value.rating,
    status: gameRef.value.status,
    title: gameRef.value.title,
    type: gameRef.value.type,
  });
  await submitEditGame(gameRef.value._id, updatedGame);
};

const handleSubmitEditCharacter = async () => {
  const updatedCharacter: TCharacterInput = reactive({
    favourites: characterRef.value.favourites,
    gender: characterRef.value.gender,
    hairColor: characterRef.value.hairColor,
    imageURL: characterRef.value.imageURL,
    link1: characterRef.value.link1,
    link1Name: characterRef.value.link1Name,
    name: characterRef.value.name,
    series: characterRef.value.series,
    source: characterRef.value.source,
  });
  await submitEditCharacter(characterRef.value._id, updatedCharacter);
};

onMounted(() => {
  animeRef.value = { ...props.media } as TAnime;
  mangaRef.value = { ...props.media } as TManga;
  gameRef.value = { ...props.media } as TGame;
  characterRef.value = { ...props.media } as TCharacter;
});
</script>
