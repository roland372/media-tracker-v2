<template>
  <CardComponent :title="props.title">
    <DisplayFilterSearchPanel v-if="props.allMedia" />
    <div>main content</div>
    <div class="grid-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="d-flex align-center justify-center"
      >
        <v-img class="media-img-card rounded" cover :src="image.imageURL" />
      </div>
    </div>
    <ButtonText v-if="props.allMedia" text="Display All" />
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import CardComponent from "./CardComponent.vue";
import DisplayFilterSearchPanel from "./DisplayFilterSearchPanel.vue";
import ButtonText from "./ButtonText.vue";

const props = defineProps({
  allMedia: { type: Boolean, default: false },
  media: { type: Object },
  title: { type: String, required: true },
});

const images = props.media?.slice(20, 100);

console.log(props.media?.[20]?.imageURL);
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  grid-gap: 10px;
}
.media-img-card {
  height: 189px;
}

@media (max-width: 1400px) {
  .media-img-card {
    height: 184px;
  }
}
@media (max-width: 1200px) {
  .media-img-card {
    height: 181px;
  }
}
@media (max-width: 992px) {
  .media-img-card {
    height: 160px;
  }
}
@media (max-width: 768px) {
  .media-img-card {
    height: 147px;
  }
}
@media (max-width: 525px) {
  .media-img-card {
    height: 129px;
  }
}
@media (max-width: 475px) {
  .media-img-card {
    height: 159px;
  }
}
@media (max-width: 420px) {
  .media-img-card {
    height: 151px;
  }
}
@media (max-width: 375px) {
  .media-img-card {
    height: 131px;
  }
}
</style>
