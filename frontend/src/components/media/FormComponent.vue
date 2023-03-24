<template>
  <v-dialog max-width="500">
    <template v-slot:default>
      <v-card max-width="500">
        <div class="bg-primary px-5 py-3 text-h6">{{ title }}</div>
        <v-card-text class="">
          <!--? ANIME -->
          <v-text-field
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Anime Title"
            :rules="[(val) => !!val || 'Title is required.']"
            variant="outlined"
          />
          <v-select
            class="mb-n3"
            :items="animeType"
            label="Select Type"
            density="compact"
            variant="outlined"
          />
          <v-text-field
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link 1 Name"
            variant="outlined"
          />
          <v-text-field
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link 1"
            variant="outlined"
          />
          <v-text-field
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link 2 Name"
            variant="outlined"
          />
          <v-text-field
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link 2"
            variant="outlined"
          />
          <v-text-field
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Image URL"
            variant="outlined"
          />
          <v-select
            class="mb-n3"
            :items="mediaRating"
            label="Rating"
            density="compact"
            variant="outlined"
          />
          <v-select
            class="mb-n3"
            :items="animeStatus"
            label="Status"
            density="compact"
            variant="outlined"
          />
          <section class="d-flex align-center">
            <div class="pe-2">Episodes</div>
            <v-text-field
              v-model="minEpisodes"
              class="no-spinners"
              density="compact"
              hide-details="auto"
              label="Min"
              maxlength="4"
              style="max-width: 20%"
              type="email"
              variant="outlined"
            />
            <v-text-field
              v-model="maxEpisodes"
              class="no-spinners ms-2"
              density="compact"
              hide-details="auto"
              label="Max"
              maxlength="4"
              style="max-width: 20%"
              type="email"
              variant="outlined"
            />
          </section>
          <section class="d-flex align-center mb-n15">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="animeFavourites" value="red" hide-details />
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
import { defineProps, ref } from "vue";
import { mediaRating, animeType, animeStatus } from "@/utils/mediaUtils";

const animeFavourites = ref<boolean>(false);

interface IFormComponentProps {
  title: string;
}

defineProps<IFormComponentProps>();

const minEpisodes = ref<string>("");
const maxEpisodes = ref<string>("");
</script>
<style scoped>
.no-spinners >>> input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.no-spinners >>> input::-webkit-outer-spin-button,
.no-spinners >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
