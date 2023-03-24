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
            variant="outlined"
          />
          <v-select
            class="mb-n3"
            :items="items"
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
            :items="items"
            label="Rating"
            density="compact"
            variant="outlined"
          />
          <v-select
            class="mb-n3"
            :items="items"
            label="Status"
            density="compact"
            variant="outlined"
          />
          <section class="d-flex align-center">
            <div class="pe-2">Episodes</div>
            <v-text-field
              density="compact"
              hide-details="auto"
              label="Min"
              style="max-width: 20%"
              variant="outlined"
            />
            <v-text-field
              class="ms-2"
              density="compact"
              hide-details="auto"
              style="max-width: 20%"
              label="Max"
              variant="outlined"
            />
          </section>
          <section class="d-flex align-center mb-n15">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="ex4" value="red" hide-details />
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
import { defineProps } from "vue";

interface IFormComponentProps {
  title: string;
}

defineProps<IFormComponentProps>();
</script>
