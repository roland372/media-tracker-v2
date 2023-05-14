<template>
  <section class="bg-primary-medium rounded mb-4 pa-4">
    <h2 class="bg-primary-light text-color rounded pa-2 text-center mb-2">
      {{ title }}
    </h2>
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

interface ICardComponentProps {
  title: string;
}

defineProps<ICardComponentProps>();
</script>
