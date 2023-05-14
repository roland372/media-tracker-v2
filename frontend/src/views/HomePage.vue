<template>
  <v-dialog v-if="selectDialog" v-model="selectDialog" width="auto">
    <v-card max-width="250">
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Select Media Type
      </div>
      <v-card-text class="my-1">
        <v-select
          v-on:update:model-value="handleShowFormDialog"
          v-model="mediaType"
          class="mb-n3"
          :items="mediaList"
          label="Select Type"
          density="compact"
          variant="outlined"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
  <FormComponent
    v-if="formDialog"
    v-model="formDialog"
    @submit="handleSubmit"
    :media-type="mediaType"
    :title="`Add ${mediaType}`"
  />
  <SnackbarComponent
    v-if="snackbar"
    :snackbar="snackbar"
    :text="`${mediaType} Added`"
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
    :media="orderBy(anime, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.ANIME"
    title="Recent Anime"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Anime" to="/anime" />
  <MediaComponent
    :media="orderBy(characters, ['lastModified'], ['desc']).slice(0, 20)"
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
    :media="orderBy(games, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.GAME"
    title="Recent Games"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Games" to="/games" />
  <MediaComponent
    :media="orderBy(manga, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.MANGA"
    title="Recent Manga"
  />
  <ButtonText class="mt-n1 mb-3" color="indigo" text="All Manga" to="/manga" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { EMediaType } from "@/types";
import { mediaList } from "@/utils/mediaUtils";
import { orderBy } from "lodash";

const selectDialog = ref<boolean>(false);
const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const mediaType = ref<string>("");

const mediaStore = useMediaStore();
const { anime, characters, games, manga } = storeToRefs(mediaStore);

const handleShowSelectDialog = () => {
  selectDialog.value = !selectDialog.value;
  snackbar.value = false;
  mediaType.value = "";
};

const handleShowFormDialog = () => {
  selectDialog.value = !selectDialog.value;
  formDialog.value = !formDialog.value;
};

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = true;
};
</script>
