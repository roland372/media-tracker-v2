<template>
  <CardComponent title="Links">
    <div
      class="d-flex flex-wrap justify-space-between align-start flex-fill align-stretch"
    >
      <section
        v-for="(category, catIdx) in Object.entries(usefulLinks)"
        :key="catIdx"
        class="text-start pa-2"
      >
        <h3 class="text-color text-capitalize text-center">
          {{ category[0] }}
        </h3>
        <div v-for="(link, linkIdx) in category[1]" :key="linkIdx" class="py-2">
          <a
            class="link-color"
            :href="link.url"
            rel="noreferrer"
            target="_blank"
          >
            <div class="d-flex flex-column justify-center align-center">
              <v-img
                :src="`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link.url}&size=256`"
                width="50"
              />
              {{ link.text }}
            </div>
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
