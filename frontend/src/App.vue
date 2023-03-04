<template>
  <div>hello</div>
  <div>store test {{ anime[0] }}</div>
  <div>{{ singleAnime }}</div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMediaStore } from "@/stores/useMediaStore";
import { onMounted } from "vue";

const mediaStore = useMediaStore();
const {
  fetchAnime,
  // fetchSingleAnime,
  // submitAddAnime,
  // submitEditAnime,
  // submitDeleteAnime,
} = mediaStore;
const { anime, singleAnime } = storeToRefs(mediaStore);

onMounted(async () => {
  console.log("MOUNTED");
  await fetchAnime();
  // await fetchSingleAnime("123");
  // await submitAddAnime({ title: "new Anime" });
  // await submitEditAnime("123", {
  //   title: "edited Anime",
  // });
  // await submitDeleteAnime("123");
});
</script>
