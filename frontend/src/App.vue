<template>
  <div>hello</div>
  <div>store test {{ notes[0] }}</div>
  <div>{{ singleNote }}</div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMediaStore } from "@/stores/useMediaStore";
import { onMounted } from "vue";

const mediaStore = useMediaStore();
const {
  fetchNotes,
  // fetchSingleNote,
  // submitAddNote,
  // submitEditNote,
  // submitDeleteNote,
} = mediaStore;
const { notes, singleNote } = storeToRefs(mediaStore);

onMounted(async () => {
  console.log("MOUNTED");
  await fetchNotes();
  // await fetchSingleNote("123");
  // await submitAddNote({ title: "new Anime" });
  // await submitEditNote("123", {
  //   title: "edited Anime",
  // });
  // await submitDeleteNote("123");
});
</script>
