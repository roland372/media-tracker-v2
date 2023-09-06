<template>
  <CardComponent :title="`${mediaType} Stats`">
    <section v-for="(item, index) in progress" :key="index" class="text-color">
      <v-progress-linear
        :class="{ 'text-black': item.color === 'white' }"
        :color="item.color"
        height="20"
        :model-value="item.value"
        ><strong
          >{{ Number.isNaN(item.value) ? 0 : Math.ceil(item.value) }}%</strong
        ></v-progress-linear
      >
    </section>
    <section v-if="mediaType !== EMediaType.CHARACTER" class="text-color">
      <br />
      <section class="d-flex justify-space-between">
        <div><b>Days:</b> {{ totalDays }}</div>
        <div>
          <b>Mean Score:</b>
          {{ meanScore }}
        </div>
      </section>
    </section>
    <br />
    <section class="d-sm-flex justify-space-between text-color">
      <section class="text-start mb-3 mb-xs-0">
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
import { EMediaType } from "../../../../common/types";

interface IStatsComponentProps {
  meanScore?: number;
  mediaType: EMediaType;
  progress: { color: string; value: number }[];
  status: { color: string; name: string; value: Ref<number> }[];
  stats: { name: string; value: Ref<number> | number | string | null }[];
  totalDays?: number;
}

defineProps<IStatsComponentProps>();
</script>
