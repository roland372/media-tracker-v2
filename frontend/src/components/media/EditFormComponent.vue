<template>
  <v-dialog max-width="500">
    <template v-slot:default>
      <v-card max-width="500">
        <div
          class="d-flex justify-space-between align-center bg-primary-light text-color px-5 py-3 text-h6"
        >
          {{ title }}
          <ButtonIcon
            @click="handleCloseModal"
            class="me-n3"
            icon="mdi-close"
            icon-color="white"
            icon-size="large"
            variant="text"
          />
        </div>
        <v-card-text>
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
                label="Max"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="animeRef.favourites" hide-details />
            </section>
            <ButtonText
              @click="handleSubmitEditAnime"
              color="yellow"
              text="Update"
            />
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
                label="Max"
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
                label="Max"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="mangaRef.favourites" hide-details />
            </section>
            <ButtonText
              @click="handleSubmitEditManga"
              color="yellow"
              text="Update"
            />
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
            <ButtonText
              @click="handleSubmitEditGame"
              color="yellow"
              text="Update"
            />
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
            <ButtonText
              @click="handleSubmitEditCharacter"
              color="yellow"
              text="Update"
            />
          </section>

          <!--? BOOKS -->
          <section v-if="props.mediaType === EMediaType.BOOK" class="mb-n12">
            <v-text-field
              v-model="bookRef.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Book Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.author"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Author"
              :rules="[(val) => !!val || 'Author is required.']"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.genre"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Genre"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="bookRef.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="bookRef.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="bookRef.status"
              class="mb-n3"
              :items="bookStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model.number="bookRef.pages"
              density="compact"
              hide-details="auto"
              label="Pages"
              maxlength="4"
              style="max-width: 20%"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="bookRef.favourites" hide-details />
            </section>
            <ButtonText
              @click="handleSubmitEditBook"
              color="yellow"
              text="Update"
            />
          </section>

          <!--? MOVIES -->
          <section v-if="props.mediaType === EMediaType.MOVIE" class="mb-n12">
            <v-text-field
              v-model="movieRef.title"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Movie Title"
              :rules="[(val) => !!val || 'Title is required.']"
              variant="outlined"
            />
            <v-select
              v-model="movieRef.type"
              class="mb-n3"
              :items="movieType"
              label="Select Type"
              density="compact"
              variant="outlined"
            />
            <v-text-field
              v-model="movieRef.link1Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="movieRef.link1"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 1 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="movieRef.link2Name"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 Name"
              variant="outlined"
            />
            <v-text-field
              v-model="movieRef.link2"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Link 2 URL"
              variant="outlined"
            />
            <v-text-field
              v-model="movieRef.imageURL"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Image URL"
              variant="outlined"
            />
            <v-select
              v-model="movieRef.rating"
              class="mb-n3"
              :items="mediaRating"
              label="Rating"
              density="compact"
              variant="outlined"
            />
            <v-select
              v-model="movieRef.status"
              class="mb-n3"
              :items="movieStatus"
              label="Status"
              density="compact"
              variant="outlined"
            />
            <section class="d-flex align-center">
              <div class="pe-2">Episodes</div>
              <v-text-field
                v-model.number="movieRef.episodesMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="movieRef.episodesMax"
                class="mx-2"
                density="compact"
                hide-details="auto"
                label="Max"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center mt-3">
              <div class="pe-2">Seasons</div>
              <v-text-field
                v-model.number="movieRef.seasonsMin"
                density="compact"
                hide-details="auto"
                label="Min"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
              <v-text-field
                v-model.number="movieRef.seasonsMax"
                class="mx-2"
                density="compact"
                hide-details="auto"
                label="Max"
                maxlength="4"
                style="max-width: 20%"
                variant="outlined"
              />
            </section>
            <section class="d-flex align-center">
              <div>Add to Favourites?</div>
              <v-checkbox v-model="movieRef.favourites" hide-details />
            </section>
            <ButtonText
              @click="handleSubmitEditMovie"
              color="yellow"
              text="Update"
            />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around"> </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref, reactive } from "vue";
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
  bookStatus,
  movieType,
  movieStatus,
} from "@/utils/mediaUtils";
import ButtonText from "../ui/ButtonText.vue";
import ButtonIcon from "../ui/ButtonIcon.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import {
  TAnime,
  TCharacter,
  TGame,
  TManga,
  TBook,
  TMovie,
  TAnimeInput,
  TCharacterInput,
  TMangaInput,
  TGameInput,
  TBookInput,
  TMovieInput,
  EAnimeStatus,
  EMangaStatus,
  EMovieStatus,
  EMediaType,
} from "@/types";

interface IFormComponentProps {
  media: TAnime | TManga | TGame | TCharacter | TBook | TMovie;
  mediaType: EMediaType;
  title: string;
}

const props = defineProps<IFormComponentProps>();
const emit = defineEmits(["edit", "close"]);

const mediaStore = useMediaStore();
const {
  submitEditAnime,
  submitEditManga,
  submitEditGame,
  submitEditCharacter,
  submitEditBook,
  submitEditMovie,
  userFromDB,
} = mediaStore;

const animeRef = ref<TAnime>(props.media as TAnime);
const mangaRef = ref<TManga>(props.media as TManga);
const gameRef = ref<TGame>(props.media as TGame);
const characterRef = ref<TCharacter>(props.media as TCharacter);
const bookRef = ref<TBook>(props.media as TBook);
const movieRef = ref<TMovie>(props.media as TMovie);

const handleSubmitEditAnime = async () => {
  const updatedAnime: TAnimeInput = reactive({
    episodesMax: animeRef.value.episodesMax,
    episodesMin:
      animeRef.value.status === EAnimeStatus.COMPLETED
        ? animeRef.value.episodesMax
        : animeRef.value.episodesMin,
    favourites: animeRef.value.favourites,
    imageURL: animeRef.value.imageURL,
    lastModified: Date.now(),
    link1: animeRef.value.link1,
    link1Name: animeRef.value.link1Name,
    link2: animeRef.value.link2,
    link2Name: animeRef.value.link2Name,
    owner: userFromDB?.email as string,
    rating: animeRef.value.rating,
    status: animeRef.value.status,
    title: animeRef.value.title,
    type: animeRef.value.type,
  });
  await submitEditAnime(animeRef.value._id, updatedAnime);
  emit("edit");
};

const handleSubmitEditManga = async () => {
  const updatedManga: TMangaInput = reactive({
    chaptersMax: mangaRef.value.chaptersMax,
    chaptersMin:
      mangaRef.value.status === EMangaStatus.COMPLETED
        ? mangaRef.value.chaptersMax
        : mangaRef.value.chaptersMin,
    favourites: mangaRef.value.favourites,
    imageURL: mangaRef.value.imageURL,
    lastModified: Date.now(),
    link1: mangaRef.value.link1,
    link1Name: mangaRef.value.link1Name,
    link2: mangaRef.value.link2,
    link2Name: mangaRef.value.link2Name,
    owner: userFromDB?.email as string,
    rating: mangaRef.value.rating,
    status: mangaRef.value.status,
    title: mangaRef.value.title,
    type: mangaRef.value.type,
    volumesMax: mangaRef.value.volumesMax,
    volumesMin:
      mangaRef.value.status === EMangaStatus.COMPLETED
        ? mangaRef.value.volumesMax
        : mangaRef.value.volumesMin,
  });
  await submitEditManga(mangaRef.value._id, updatedManga);
  emit("edit");
};

const handleSubmitEditGame = async () => {
  const updatedGame: TGameInput = reactive({
    favourites: gameRef.value.favourites,
    imageURL: gameRef.value.imageURL,
    lastModified: Date.now(),
    link1: gameRef.value.link1,
    link1Name: gameRef.value.link1Name,
    link2: gameRef.value.link2,
    link2Name: gameRef.value.link2Name,
    owner: userFromDB?.email as string,
    playtime: gameRef.value.playtime,
    rating: gameRef.value.rating,
    status: gameRef.value.status,
    title: gameRef.value.title,
    type: gameRef.value.type,
  });
  await submitEditGame(gameRef.value._id, updatedGame);
  emit("edit");
};

const handleSubmitEditCharacter = async () => {
  const updatedCharacter: TCharacterInput = reactive({
    favourites: characterRef.value.favourites,
    gender: characterRef.value.gender,
    hairColor: characterRef.value.hairColor,
    imageURL: characterRef.value.imageURL,
    lastModified: Date.now(),
    link1: characterRef.value.link1,
    link1Name: characterRef.value.link1Name,
    name: characterRef.value.name,
    owner: userFromDB?.email as string,
    series: characterRef.value.series,
    source: characterRef.value.source,
  });
  await submitEditCharacter(characterRef.value._id, updatedCharacter);
  emit("edit");
};

const handleSubmitEditBook = async () => {
  const updatedBook: TBookInput = reactive({
    author: bookRef.value.author,
    favourites: bookRef.value.favourites,
    genre: bookRef.value.genre,
    imageURL: bookRef.value.imageURL,
    lastModified: Date.now(),
    link1: bookRef.value.link1,
    link1Name: bookRef.value.link1Name,
    link2: bookRef.value.link2,
    link2Name: bookRef.value.link2Name,
    owner: userFromDB?.email as string,
    pages: bookRef.value.pages,
    rating: bookRef.value.rating,
    status: bookRef.value.status,
    title: bookRef.value.title,
  });
  await submitEditBook(bookRef.value._id, updatedBook);
  emit("edit");
};

const handleSubmitEditMovie = async () => {
  const updatedMovie: TMovieInput = reactive({
    episodesMax: movieRef.value.episodesMax,
    episodesMin:
      movieRef.value.status === EMovieStatus.COMPLETED
        ? movieRef.value.episodesMax
        : movieRef.value.episodesMin,
    favourites: movieRef.value.favourites,
    imageURL: movieRef.value.imageURL,
    lastModified: Date.now(),
    link1: movieRef.value.link1,
    link1Name: movieRef.value.link1Name,
    link2: movieRef.value.link2,
    link2Name: movieRef.value.link2Name,
    owner: userFromDB?.email as string,
    rating: movieRef.value.rating,
    seasonsMax: movieRef.value.seasonsMax,
    seasonsMin:
      movieRef.value.status === EMovieStatus.COMPLETED
        ? movieRef.value.seasonsMax
        : movieRef.value.seasonsMin,
    status: movieRef.value.status,
    title: movieRef.value.title,
    type: movieRef.value.type,
  });
  await submitEditMovie(movieRef.value._id, updatedMovie);
  emit("edit");
};

const handleCloseModal = () => {
  emit("close");
};

onMounted(() => {
  animeRef.value = { ...props.media } as TAnime;
  mangaRef.value = { ...props.media } as TManga;
  gameRef.value = { ...props.media } as TGame;
  characterRef.value = { ...props.media } as TCharacter;
  bookRef.value = { ...props.media } as TBook;
  movieRef.value = { ...props.media } as TMovie;
});
</script>
