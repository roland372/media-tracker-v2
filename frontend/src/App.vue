<template>
  <div>hello</div>
  <div>store test {{ count }}</div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMediaTrackerStore } from "@/stores/useMediaTrackerStore";

const mediaTrackerStore = useMediaTrackerStore();
const { count } = storeToRefs(mediaTrackerStore);

setInterval(() => {
  mediaTrackerStore.increment();
}, 1000);
</script>
