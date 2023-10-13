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
            <v-form @submit.prevent="handleSubmitEditAnime" validate-on="input">
              <v-text-field
                v-model="animeRef.title"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Title"
                :rules="stringRules('Title')"
                variant="outlined"
              />
              <v-select
                v-model="animeRef.type"
                class="mb-n3"
                density="compact"
                :items="animeType"
                label="Select Type"
                variant="outlined"
              />
              <v-text-field
                v-model="animeRef.linkName"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link Name"
                variant="outlined"
              />
              <v-text-field
                v-model="animeRef.link"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-text-field
                v-model="animeRef.imageURL"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Image URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-select
                v-model="animeRef.rating"
                class="mb-n3"
                density="compact"
                :items="mediaRating"
                label="Rating"
                variant="outlined"
              />
              <v-select
                v-model="animeRef.status"
                class="mb-n3"
                density="compact"
                :items="animeStatus"
                label="Status"
                variant="outlined"
              />
              <section class="d-flex align-center me-n2">
                <div class="pe-2">Episodes</div>
                <v-text-field
                  v-model.number="animeRef.episodesMin"
                  density="compact"
                  hide-details="auto"
                  label="Min"
                  maxlength="4"
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
                <v-text-field
                  v-model.number="animeRef.episodesMax"
                  class="mx-2"
                  density="compact"
                  hide-details="auto"
                  label="Max"
                  maxlength="4"
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
              </section>
              <section class="d-flex align-center">
                <div>Add to Favourites?</div>
                <v-checkbox v-model="animeRef.favourites" hide-details />
              </section>
              <ButtonText color="yellow" text="Update" type="submit" />
            </v-form>
          </section>

          <!--? MANGA -->
          <section v-if="props.mediaType === EMediaType.MANGA" class="mb-n12">
            <v-form @submit.prevent="handleSubmitEditManga" validate-on="input">
              <v-text-field
                v-model="mangaRef.title"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Title"
                :rules="stringRules('Title')"
                variant="outlined"
              />
              <v-select
                v-model="mangaRef.type"
                class="mb-n3"
                density="compact"
                :items="mangaType"
                label="Select Type"
                variant="outlined"
              />
              <v-text-field
                v-model="mangaRef.linkName"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link Name"
                variant="outlined"
              />
              <v-text-field
                v-model="mangaRef.link"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-text-field
                v-model="mangaRef.imageURL"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Image URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-select
                v-model="mangaRef.rating"
                class="mb-n3"
                density="compact"
                :items="mediaRating"
                label="Rating"
                variant="outlined"
              />
              <v-select
                v-model="mangaRef.status"
                class="mb-n3"
                density="compact"
                :items="mangaStatus"
                label="Status"
                variant="outlined"
              />
              <section class="d-flex align-center me-n2">
                <div class="pe-2">Chapters</div>
                <v-text-field
                  v-model.number="mangaRef.chaptersMin"
                  density="compact"
                  hide-details="auto"
                  label="Min"
                  maxlength="4"
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
                <v-text-field
                  v-model.number="mangaRef.chaptersMax"
                  class="mx-2"
                  density="compact"
                  hide-details="auto"
                  label="Max"
                  maxlength="4"
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
              </section>
              <section class="d-flex align-center mt-3 me-n2">
                <div class="pe-2">Volumes</div>
                <v-text-field
                  v-model.number="mangaRef.volumesMin"
                  density="compact"
                  hide-details="auto"
                  label="Min"
                  maxlength="4"
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
                <v-text-field
                  v-model.number="mangaRef.volumesMax"
                  class="mx-2"
                  density="compact"
                  hide-details="auto"
                  label="Max"
                  maxlength="4"
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
              </section>
              <section class="d-flex align-center">
                <div>Add to Favourites?</div>
                <v-checkbox v-model="mangaRef.favourites" hide-details />
              </section>
              <ButtonText color="yellow" text="Update" type="submit" />
            </v-form>
          </section>

          <!--? GAMES -->
          <section v-if="props.mediaType === EMediaType.GAME" class="mb-n12">
            <v-form @submit.prevent="handleSubmitEditGame" validate-on="input">
              <v-text-field
                v-model="gameRef.title"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Title"
                :rules="stringRules('Title')"
                variant="outlined"
              />
              <v-select
                v-model="gameRef.type"
                class="mb-n3"
                density="compact"
                :items="gameType"
                label="Select Type"
                variant="outlined"
              />
              <v-text-field
                v-model="gameRef.linkName"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link Name"
                variant="outlined"
              />
              <v-text-field
                v-model="gameRef.link"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-text-field
                v-model="gameRef.imageURL"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Image URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-select
                v-model="gameRef.rating"
                class="mb-n3"
                density="compact"
                :items="mediaRating"
                label="Rating"
                variant="outlined"
              />
              <v-select
                v-model="gameRef.status"
                class="mb-n3"
                density="compact"
                :items="gameStatus"
                label="Status"
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
                  :rules="numberRules"
                  style="max-width: 50%"
                  variant="outlined"
                />
              </section>
              <section class="d-flex align-center">
                <div>Add to Favourites?</div>
                <v-checkbox v-model="gameRef.favourites" hide-details />
              </section>
              <ButtonText color="yellow" text="Update" type="submit" />
            </v-form>
          </section>

          <!--? CHARACTERS -->
          <section
            v-if="props.mediaType === EMediaType.CHARACTER"
            class="mb-n12"
          >
            <v-form
              @submit.prevent="handleSubmitEditCharacter"
              validate-on="input"
            >
              <v-text-field
                v-model="characterRef.name"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Name"
                :rules="stringRules('Name')"
                variant="outlined"
              />
              <v-select
                v-model="characterRef.source"
                class="mb-n3"
                density="compact"
                :items="characterSource"
                label="Select Source"
                variant="outlined"
              />
              <v-select
                v-model="characterRef.gender"
                class="mb-n3"
                density="compact"
                :items="characterGender"
                label="Select Gender"
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
                v-model="characterRef.linkName"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link Name"
                variant="outlined"
              />
              <v-text-field
                v-model="characterRef.link"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-text-field
                v-model="characterRef.imageURL"
                density="compact"
                hide-details="auto"
                label="Image URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <section class="d-flex align-center">
                <div>Add to Favourites?</div>
                <v-checkbox v-model="characterRef.favourites" hide-details />
              </section>
              <ButtonText color="yellow" text="Update" type="submit" />
            </v-form>
          </section>

          <!--? BOOKS -->
          <section v-if="props.mediaType === EMediaType.BOOK" class="mb-n12">
            <v-form @submit.prevent="handleSubmitEditBook" validate-on="input">
              <v-text-field
                v-model="bookRef.title"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Title"
                :rules="stringRules('Title')"
                variant="outlined"
              />
              <v-text-field
                v-model="bookRef.author"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Author"
                :rules="stringRules('Author')"
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
                v-model="bookRef.linkName"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link Name"
                variant="outlined"
              />
              <v-text-field
                v-model="bookRef.link"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-text-field
                v-model="bookRef.imageURL"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Image URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-select
                v-model="bookRef.rating"
                class="mb-n3"
                density="compact"
                :items="mediaRating"
                label="Rating"
                variant="outlined"
              />
              <v-select
                v-model="bookRef.status"
                class="mb-n3"
                density="compact"
                :items="bookStatus"
                label="Status"
                variant="outlined"
              />
              <v-text-field
                v-model.number="bookRef.pages"
                density="compact"
                hide-details="auto"
                label="Pages"
                maxlength="4"
                :rules="numberRules"
                style="max-width: 50%"
                variant="outlined"
              />
              <section class="d-flex align-center">
                <div>Add to Favourites?</div>
                <v-checkbox v-model="bookRef.favourites" hide-details />
              </section>
              <ButtonText color="yellow" text="Update" type="submit" />
            </v-form>
          </section>

          <!--? MOVIES -->
          <section v-if="props.mediaType === EMediaType.MOVIE" class="mb-n12">
            <v-form @submit.prevent="handleSubmitEditMovie" validate-on="input">
              <v-text-field
                v-model="movieRef.title"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Title"
                :rules="stringRules('Title')"
                variant="outlined"
              />
              <v-select
                v-model="movieRef.type"
                class="mb-n3"
                density="compact"
                :items="movieType"
                label="Select Type"
                variant="outlined"
              />
              <v-text-field
                v-model="movieRef.linkName"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link Name"
                variant="outlined"
              />
              <v-text-field
                v-model="movieRef.link"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Link URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-text-field
                v-model="movieRef.imageURL"
                class="mb-2"
                density="compact"
                hide-details="auto"
                label="Image URL"
                :rules="emptyURLRules"
                variant="outlined"
              />
              <v-select
                v-model="movieRef.rating"
                class="mb-n3"
                density="compact"
                :items="mediaRating"
                label="Rating"
                variant="outlined"
              />
              <v-select
                v-model="movieRef.status"
                class="mb-n3"
                density="compact"
                :items="movieStatus"
                label="Status"
                variant="outlined"
              />
              <div v-if="movieRef.type === EMovieType.TV_SHOW">
                <section class="d-flex align-center me-n2">
                  <div class="pe-2">Episodes</div>
                  <v-text-field
                    v-model.number="movieRef.episodesMin"
                    density="compact"
                    hide-details="auto"
                    label="Min"
                    maxlength="4"
                    :rules="numberRules"
                    style="max-width: 50%"
                    variant="outlined"
                  />
                  <v-text-field
                    v-model.number="movieRef.episodesMax"
                    class="mx-2"
                    density="compact"
                    hide-details="auto"
                    label="Max"
                    maxlength="4"
                    :rules="numberRules"
                    style="max-width: 50%"
                    variant="outlined"
                  />
                </section>
                <section class="d-flex align-center mt-3 me-n2">
                  <div class="pe-2">Seasons</div>
                  <v-text-field
                    v-model.number="movieRef.seasonsMin"
                    density="compact"
                    hide-details="auto"
                    label="Min"
                    maxlength="4"
                    :rules="numberRules"
                    style="max-width: 50%"
                    variant="outlined"
                  />
                  <v-text-field
                    v-model.number="movieRef.seasonsMax"
                    class="mx-2"
                    density="compact"
                    hide-details="auto"
                    label="Max"
                    maxlength="4"
                    :rules="numberRules"
                    style="max-width: 50%"
                    variant="outlined"
                  />
                </section>
              </div>
              <section class="d-flex align-center">
                <div>Add to Favourites?</div>
                <v-checkbox v-model="movieRef.favourites" hide-details />
              </section>
              <ButtonText color="yellow" text="Update" type="submit" />
            </v-form>
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around"> </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import {
  digitRegex,
  emptyURLRules,
  numberRules,
  stringRules,
  URLRegex,
} from "@/utils/validations/formValidations";
import {
  animeStatus,
  animeType,
  bookStatus,
  characterGender,
  characterSource,
  gameStatus,
  gameType,
  mangaStatus,
  mangaType,
  mediaRating,
  movieStatus,
  movieType,
} from "@/utils/mediaUtils";
import ButtonIcon from "../ui/ButtonIcon.vue";
import ButtonText from "../ui/ButtonText.vue";
import {
  TAnime,
  TAnimeInput,
  TBook,
  TBookInput,
  TCharacter,
  TCharacterInput,
  TGame,
  TGameInput,
  TManga,
  TMangaInput,
  TMovie,
  TMovieInput,
} from "@/types";
import {
  EAnimeStatus,
  EMangaStatus,
  EMediaType,
  EMovieStatus,
  EMovieType,
} from "../../../../common/types";

interface IFormComponentProps {
  media: TAnime | TBook | TCharacter | TGame | TManga | TMovie;
  mediaType: EMediaType;
  title: string;
}

const emit = defineEmits(["edit", "close"]);
const props = defineProps<IFormComponentProps>();

const mediaStore = useMediaStore();
const {
  submitEditAnime,
  submitEditBook,
  submitEditCharacter,
  submitEditGame,
  submitEditManga,
  submitEditMovie,
  userFromDB,
} = mediaStore;

const animeRef = ref<TAnime>(props.media as TAnime);
const bookRef = ref<TBook>(props.media as TBook);
const characterRef = ref<TCharacter>(props.media as TCharacter);
const gameRef = ref<TGame>(props.media as TGame);
const mangaRef = ref<TManga>(props.media as TManga);
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
    link: animeRef.value.link,
    linkName: animeRef.value.linkName,
    owner: userFromDB?.email as string,
    rating: animeRef.value.rating,
    status: animeRef.value.status,
    title: animeRef.value.title,
    type: animeRef.value.type,
  });

  if (
    updatedAnime.title &&
    digitRegex.test(String(updatedAnime.episodesMax)) &&
    digitRegex.test(String(updatedAnime.episodesMin)) &&
    (!updatedAnime.link || URLRegex.test(String(updatedAnime.link))) &&
    (!updatedAnime.imageURL || URLRegex.test(String(updatedAnime.imageURL)))
  ) {
    await submitEditAnime(animeRef.value._id, updatedAnime);
    emit("edit");
  }
};

const handleSubmitEditBook = async () => {
  const updatedBook: TBookInput = reactive({
    author: bookRef.value.author,
    favourites: bookRef.value.favourites,
    genre: bookRef.value.genre,
    imageURL: bookRef.value.imageURL,
    lastModified: Date.now(),
    link: bookRef.value.link,
    linkName: bookRef.value.linkName,
    owner: userFromDB?.email as string,
    pages: bookRef.value.pages,
    rating: bookRef.value.rating,
    status: bookRef.value.status,
    title: bookRef.value.title,
  });

  if (
    updatedBook.title &&
    updatedBook.author &&
    digitRegex.test(String(updatedBook.pages)) &&
    (!updatedBook.link || URLRegex.test(String(updatedBook.link))) &&
    (!updatedBook.imageURL || URLRegex.test(String(updatedBook.imageURL)))
  ) {
    await submitEditBook(bookRef.value._id, updatedBook);
    emit("edit");
  }
};

const handleSubmitEditCharacter = async () => {
  const updatedCharacter: TCharacterInput = reactive({
    favourites: characterRef.value.favourites,
    gender: characterRef.value.gender,
    hairColor: characterRef.value.hairColor,
    imageURL: characterRef.value.imageURL,
    lastModified: Date.now(),
    link: characterRef.value.link,
    linkName: characterRef.value.linkName,
    name: characterRef.value.name,
    owner: userFromDB?.email as string,
    series: characterRef.value.series,
    source: characterRef.value.source,
  });

  if (
    updatedCharacter.name &&
    (!updatedCharacter.link || URLRegex.test(String(updatedCharacter.link))) &&
    (!updatedCharacter.imageURL ||
      URLRegex.test(String(updatedCharacter.imageURL)))
  ) {
    await submitEditCharacter(characterRef.value._id, updatedCharacter);
    emit("edit");
  }
};

const handleSubmitEditGame = async () => {
  const updatedGame: TGameInput = reactive({
    favourites: gameRef.value.favourites,
    imageURL: gameRef.value.imageURL,
    lastModified: Date.now(),
    link: gameRef.value.link,
    linkName: gameRef.value.linkName,
    owner: userFromDB?.email as string,
    playtime: gameRef.value.playtime,
    rating: gameRef.value.rating,
    status: gameRef.value.status,
    title: gameRef.value.title,
    type: gameRef.value.type,
  });

  if (
    updatedGame.title &&
    digitRegex.test(String(updatedGame.playtime)) &&
    (!updatedGame.link || URLRegex.test(String(updatedGame.link))) &&
    (!updatedGame.imageURL || URLRegex.test(String(updatedGame.imageURL)))
  ) {
    await submitEditGame(gameRef.value._id, updatedGame);
    emit("edit");
  }
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
    link: mangaRef.value.link,
    linkName: mangaRef.value.linkName,
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

  if (
    updatedManga.title &&
    digitRegex.test(String(updatedManga.chaptersMax)) &&
    digitRegex.test(String(updatedManga.chaptersMin)) &&
    digitRegex.test(String(updatedManga.volumesMax)) &&
    digitRegex.test(String(updatedManga.volumesMin)) &&
    (!updatedManga.link || URLRegex.test(String(updatedManga.link))) &&
    (!updatedManga.imageURL || URLRegex.test(String(updatedManga.imageURL)))
  ) {
    await submitEditManga(mangaRef.value._id, updatedManga);
    emit("edit");
  }
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
    link: movieRef.value.link,
    linkName: movieRef.value.linkName,
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

  if (
    updatedMovie.title &&
    digitRegex.test(String(updatedMovie.episodesMax)) &&
    digitRegex.test(String(updatedMovie.episodesMin)) &&
    digitRegex.test(String(updatedMovie.seasonsMax)) &&
    digitRegex.test(String(updatedMovie.seasonsMin)) &&
    (!updatedMovie.link || URLRegex.test(String(updatedMovie.link))) &&
    (!updatedMovie.imageURL || URLRegex.test(String(updatedMovie.imageURL)))
  ) {
    await submitEditMovie(movieRef.value._id, updatedMovie);
    emit("edit");
  }
};

const handleCloseModal = () => {
  emit("close");
};

onMounted(() => {
  animeRef.value = { ...props.media } as TAnime;
  bookRef.value = { ...props.media } as TBook;
  characterRef.value = { ...props.media } as TCharacter;
  gameRef.value = { ...props.media } as TGame;
  mangaRef.value = { ...props.media } as TManga;
  movieRef.value = { ...props.media } as TMovie;
});
</script>
