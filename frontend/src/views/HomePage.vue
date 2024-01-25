<template>
  <v-dialog v-if="selectDialog" v-model="selectDialog" width="auto">
    <v-card max-width="250">
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Select Media Type
      </div>
      <v-card-text class="my-1">
        <v-select
          v-model="mediaType"
          v-on:update:model-value="handleShowFormDialog"
          class="mb-n3"
          density="compact"
          :items="mediaList"
          label="Select Type"
          variant="outlined"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
  <FormComponent
    v-if="formDialog"
    v-model="formDialog"
    @close="formDialog = !formDialog"
    @submit="handleSubmit"
    :media-type="mediaType"
    :title="`Add ${mediaType}`"
  />
  <HeaderComponent
    title="Welcome to Media-Tracker
"
  >
    <section class="d-sm-flex align-center justify-start">
      <ButtonText
        @click="handleShowSelectDialog"
        color="indigo"
        text="Add Media"
      />
    </section>
  </HeaderComponent>
  <MediaComponent
    :media="orderBy(anime, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.ANIME"
    title="Recent Anime"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Anime" to="/anime" />
  <MediaComponent
    :media="orderBy(characters, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.CHARACTER"
    title="Recent Characters"
  />
  <ButtonText
    class="mt-n1 mb-3"
    color="indigo"
    text="All Characters"
    to="/characters"
  />
  <MediaComponent
    :media="orderBy(games, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.GAME"
    title="Recent Games"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Games" to="/games" />
  <MediaComponent
    :media="orderBy(manga, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.MANGA"
    title="Recent Manga"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Books" to="/books" />
  <MediaComponent
    :media="orderBy(books, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.BOOK"
    title="Recent Books"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Books" to="/books" />
  <MediaComponent
    :media="orderBy(movies, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.MOVIE"
    title="Recent Movies"
  />
  <ButtonText
    class="mt-n1 mb-3"
    color="indigo"
    text="All Movies"
    to="/movies"
  />
  <LinksComponent />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { orderBy } from "lodash";
import { mediaList } from "@/utils/mediaUtils";
import ButtonText from "@/components/ui/ButtonText.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import LinksComponent from "@/components/media/LinksComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import { EMediaType } from "../../../common/types";

const mediaStore = useMediaStore();
const { fetchRecentMedia } = mediaStore;
const { anime, characters, games, manga, books, movies } =
  storeToRefs(mediaStore);

const formDialog = ref<boolean>(false);
const mediaType = ref<string>("");
const selectDialog = ref<boolean>(false);

const handleShowFormDialog = () => {
  selectDialog.value = !selectDialog.value;
  formDialog.value = !formDialog.value;
};

const handleShowSelectDialog = () => {
  selectDialog.value = !selectDialog.value;
  mediaType.value = "";
};

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
};

onMounted(async () => {
  await fetchRecentMedia();
});
</script>
