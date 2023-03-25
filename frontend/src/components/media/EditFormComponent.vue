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
            <ButtonText @click="handleSubmit" text="Edit" />
          </section>
          <!--? MANGA -->

          <!--? GAMES -->

          <!--? CHARACTERS -->
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around"> </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref, reactive } from "vue";
import { mediaRating, animeType, animeStatus } from "@/utils/mediaUtils";
import ButtonText from "../ui/ButtonText.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import {
  TAnime,
  TCharacter,
  TGame,
  TManga,
  TAnimeInput,
  EMediaType,
} from "@/types";

interface IFormComponentProps {
  media: TAnime | TManga | TGame | TCharacter;
  mediaType: EMediaType;
  title: string;
}

const props = defineProps<IFormComponentProps>();

const mediaStore = useMediaStore();
const { submitEditAnime } = mediaStore;

const animeRef = ref<TAnime>(props.media as TAnime);

const handleSubmit = async () => {
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

onMounted(() => {
  // console.log(props.media);
  animeRef.value = { ...props.media } as TAnime;
});
// submitEditAnime(animeRef._id, animeRef)
</script>
