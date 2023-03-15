<template>
  <CardComponent :title="title">
    <DisplayFilterSearchPanel v-if="allMedia" />
    <section class="grid-container">
      <section
        v-for="(image, index) in images"
        :key="index"
        class="d-flex align-center justify-center"
      >
        <MediaCard
          class="media-img-card"
          :media="image"
          :media-type="mediaType"
        />
      </section>
    </section>
    <ButtonText v-if="allMedia" text="Display All" />
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import CardComponent from "./CardComponent.vue";
import DisplayFilterSearchPanel from "./DisplayFilterSearchPanel.vue";
import MediaCard from "./MediaCard.vue";
import ButtonText from "./ButtonText.vue";

const props = defineProps({
  allMedia: { type: Boolean, default: false },
  media: { type: Object },
  mediaType: { type: String, required: true },
  title: { type: String, required: true },
});

const images = props.media?.slice(20, 23);
</script>
<style>
.media-img-card {
  height: 275px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, auto);
  grid-gap: 10px;
}
@media (max-width: 3250px) {
  .media-img-card {
    height: 275px;
  }
  .grid-container {
    grid-template-columns: repeat(12, auto);
  }
}
@media (max-width: 2560px) {
  .media-img-card {
    height: 320px;
  }
  .grid-container {
    grid-template-columns: repeat(10, auto);
  }
}
@media (max-width: 2550px) {
  .media-img-card {
    height: 250px;
  }
  .grid-container {
    grid-template-columns: repeat(10, auto);
  }
}
@media (max-width: 1920px) {
  .media-img-card {
    height: 200px;
  }
  .grid-container {
    grid-template-columns: repeat(8, auto);
  }
}
@media (max-width: 1440px) {
  .media-img-card {
    height: 200px;
  }
  .grid-container {
    grid-template-columns: repeat(8, auto);
  }
}
@media (max-width: 1280px) {
  .media-img-card {
    height: 165px;
  }
  .grid-container {
    grid-template-columns: repeat(7, auto);
  }
}
@media (max-width: 1024px) {
  .media-img-card {
    height: 165px;
  }
  .grid-container {
    grid-template-columns: repeat(7, auto);
  }
}
@media (max-width: 960px) {
  .media-img-card {
    height: 200px;
  }
  .grid-container {
    grid-template-columns: repeat(6, auto);
  }
}
@media (max-width: 880px) {
  .media-img-card {
    height: 230px;
  }
  .grid-container {
    grid-template-columns: repeat(5, auto);
  }
}
@media (max-width: 768px) {
  .media-img-card {
    height: 200px;
  }
  .grid-container {
    grid-template-columns: repeat(5, auto);
  }
}
@media (max-width: 700px) {
  .media-img-card {
    height: 220px;
  }
  .grid-container {
    grid-template-columns: repeat(4, auto);
  }
}
@media (max-width: 630px) {
  .media-img-card {
    height: 200px;
  }
  .grid-container {
    grid-template-columns: repeat(4, auto);
  }
}
@media (max-width: 580px) {
  .media-img-card {
    height: 180px;
  }
  .grid-container {
    grid-template-columns: repeat(4, auto);
  }
}
@media (max-width: 500px) {
  .media-img-card {
    height: 150px;
  }
  .grid-container {
    grid-template-columns: repeat(4, auto);
  }
}
@media (max-width: 425px) {
  .media-img-card {
    height: 125px;
  }
  .grid-container {
    grid-template-columns: repeat(4, auto);
  }
}
@media (max-width: 375px) {
  .media-img-card {
    height: 105px;
  }
  .grid-container {
    grid-template-columns: repeat(4, auto);
  }
}
@media (max-width: 320px) {
  .media-img-card {
    height: 120px;
  }
  .grid-container {
    grid-template-columns: repeat(3, auto);
  }
}
</style>
