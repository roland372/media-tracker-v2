<template>
  <CardComponent :title="props.title">
    <DisplayFilterSearchPanel v-if="props.allMedia" />
    <div>main content</div>
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
  title: { type: String, required: true },
});
</script>
