<template>
  <CardComponent :title="title">
    <slot></slot>
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import CardComponent from "@/components/media/CardComponent.vue";

interface IHeaderComponent {
  title: string;
}

defineProps<IHeaderComponent>();
</script>
