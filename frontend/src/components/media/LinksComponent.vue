<template>
  <CardComponent title="Links">
    <div class="d-flex flex-wrap justify-space-between align-start">
      <section class="text-start pa-2">
        <h3 class="text-color">Anime</h3>
        <div v-for="link in usefulLinks.anime" :key="link.url">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </section>
      <section class="text-start pa-2">
        <h3 class="text-color">Books</h3>
        <div v-for="link in usefulLinks.books" :key="link.url">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </section>
      <section class="text-start pa-2">
        <h3 class="text-color">Games</h3>
        <div v-for="link in usefulLinks.games" :key="link.url">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </section>
      <section class="text-start pa-2">
        <h3 class="text-color">Manga</h3>
        <div v-for="link in usefulLinks.manga" :key="link.url">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </section>
      <section class="text-start pa-2">
        <h3 class="text-color">Movies</h3>
        <div v-for="link in usefulLinks.movies" :key="link.url">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </section>
      <section class="text-start pa-2">
        <h3 class="text-color">Other</h3>
        <div v-for="link in usefulLinks.other" :key="link.url">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </div>
      </section>
    </div>
  </CardComponent>
</template>
<script setup lang="ts">
import { usefulLinks } from "@/utils/links";
import CardComponent from "@/components/media/CardComponent.vue";
</script>
