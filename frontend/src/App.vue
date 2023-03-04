<template>
  <div>hello</div>
  <div>store test {{ count }}</div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMediaStore } from "@/stores/useMediaStore";

const mediaTrackerStore = useMediaStore();
const { count } = storeToRefs(mediaTrackerStore);

setInterval(() => {
  mediaTrackerStore.increment();
}, 1000);
</script>
