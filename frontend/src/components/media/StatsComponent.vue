<template>
  <CardComponent :title="`${media} Stats`">
    <section v-for="(item, index) in progress" :key="index">
      <v-progress-linear
        :color="item.color"
        height="20"
        :model-value="item.value"
        ><strong>{{ Math.ceil(item.value) }}%</strong></v-progress-linear
      >
    </section>
    <br />
    <section class="d-flex justify-space-between">
      <div><b>Days:</b> {{ totalDays }}</div>
      <div>
        <b>Mean Score:</b>
        {{ meanScore }}
      </div>
    </section>
    <br />
    <section class="d-flex justify-space-between">
      <section class="text-start">
        <div
          v-for="(item, index) in status"
          :key="index"
          class="d-flex align-center justify-space-between"
        >
          <div class="d-flex align-center">
            <v-icon :color="item.color" icon="mdi-circle" />
            <div class="ms-2">
              <b>{{ item.name }}</b>
            </div>
          </div>
          <span class="ms-4">{{ item.value }}</span>
        </div>
      </section>

      <section class="d-flex flex-column">
        <div
          v-for="(item, index) in stats"
          :key="index"
          class="d-flex justify-space-between"
        >
          <div>
            <b>{{ item.name }}</b>
          </div>
          <div class="ms-4">{{ item.value }}</div>
        </div>
      </section>
    </section>
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps, Ref } from "vue";
import CardComponent from "@/components/media/CardComponent.vue";

interface IStatsComponentProps {
  meanScore: number;
  media: string;
  progress: { color: string; value: number }[];
  status: { color: string; name: string; value: Ref<number> }[];
  stats: { name: string; value: Ref<number> | number | null }[];
  totalDays: number;
}

defineProps<IStatsComponentProps>();
</script>
