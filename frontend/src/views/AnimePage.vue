<template>
  <HeaderComponent title="Anime">
    <section class="d-sm-flex align-center justify-center">
      <ButtonText text="Add Anime" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="animeSearch"
        @click:append-inner="handleAnimeSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for Anime"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent media="Anime">
    <v-progress-linear
      color="green"
      height="20"
      :model-value="calculatePercentage(watching, anime.length)"
      ><strong
        >{{ Math.ceil(calculatePercentage(watching, anime.length)) }}%</strong
      ></v-progress-linear
    >
    <v-progress-linear
      color="blue"
      height="20"
      :model-value="calculatePercentage(completed, anime.length)"
      ><strong
        >{{ Math.ceil(calculatePercentage(completed, anime.length)) }}%</strong
      ></v-progress-linear
    >
    <v-progress-linear
      color="yellow"
      height="20"
      :model-value="calculatePercentage(onHold, anime.length)"
      ><strong
        >{{ Math.ceil(calculatePercentage(onHold, anime.length)) }}%</strong
      ></v-progress-linear
    >
    <v-progress-linear
      color="red"
      height="20"
      :model-value="calculatePercentage(dropped, anime.length)"
      ><strong
        >{{ Math.ceil(calculatePercentage(dropped, anime.length)) }}%</strong
      ></v-progress-linear
    >
    <v-progress-linear
      color="white"
      height="20"
      :model-value="calculatePercentage(planToWatch, anime.length)"
      ><strong
        >{{
          Math.ceil(calculatePercentage(planToWatch, anime.length))
        }}%</strong
      ></v-progress-linear
    >
    <br />
    <section class="d-flex justify-space-between">
      <div><b>Days:</b> {{ round(watchedEpisodesSum / 60, 1) }}</div>
      <div>
        <b>Mean Score:</b>
        {{
          filterZeroRating === 0 ? 0 : round(totalRating / filterZeroRating, 2)
        }}
      </div>
    </section>
    <br />
    <section class="d-flex justify-space-between">
      <section class="text-start">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon color="green" icon="mdi-circle" />
            <div class="ms-2"><b>Watching</b></div>
          </div>
          <span class="ms-4">{{ watching }}</span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon color="blue" icon="mdi-circle" />
            <div class="ms-2"><b>Completed</b></div>
          </div>
          <span class="ms-4">{{ completed }}</span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon color="yellow" icon="mdi-circle" />
            <div class="ms-2"><b>On-Hold</b></div>
          </div>
          <span class="ms-4">{{ onHold }}</span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon color="red" icon="mdi-circle" />
            <div class="ms-2"><b>Dropped</b></div>
          </div>
          <span class="ms-4">{{ dropped }}</span>
        </div>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon color="white" icon="mdi-circle" />
            <div class="ms-2"><b>Plan to Watch</b></div>
          </div>
          <span class="ms-4">{{ planToWatch }}</span>
        </div>
      </section>

      <section class="d-flex flex-column">
        <div class="d-flex justify-space-between">
          <div><b>Total Anime</b></div>
          <div class="ms-4">{{ anime.length }}</div>
        </div>
        <div class="d-flex justify-space-between">
          <div><b>Favourites</b></div>
          <div class="ms-4">{{ favourites }}</div>
        </div>
        <div class="d-flex justify-space-between">
          <div><b>Total Episodes</b></div>
          <div class="ms-4">{{ totalEpisodesSum }}</div>
        </div>
        <div class="d-flex justify-space-between">
          <div><b>Watched Episodes</b></div>
          <div class="ms-4">{{ watchedEpisodesSum }}</div>
        </div>
        <div>&#8203;</div>
      </section>
    </section>
  </StatsComponent>
  <!-- <MediaComponent title="All Anime" all-media /> -->
  <MediaComponent
    all-media
    :media="sortedAnime"
    media-type="anime"
    title="Recent Anime"
  />
  <!-- <MediaComponent :media="favouriteAnime" title="Favourite Anime" /> -->
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ButtonText from "@/components/ButtonText.vue";
import StatsComponent from "@/components/StatsComponent.vue";
import MediaComponent from "@/components/MediaComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { sortMediaByDate, favouriteMedia } from "@/utils/mediaUtils";
import { filterMediaStatus } from "@/utils/mediaUtils";

const mediaStore = useMediaStore();
const { anime } = storeToRefs(mediaStore);

const animeSearch = ref<string>("");
const sortedAnime = sortMediaByDate(anime);
const favouriteAnime = favouriteMedia(anime);

const round = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

const calculatePercentage = (numerator: number, denominator: number) =>
  (numerator / denominator) * 100;

const filterZeroRating = ref(
  anime.value.filter((anime) => anime.rating !== 0).length
);
const totalRating = ref(
  anime.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);
const totalEpisodesSum = ref(
  anime.value.reduce(
    (accumulator, object) => accumulator + object.episodesMax,
    0
  )
);
const watchedEpisodesSum = ref(
  anime.value.reduce(
    (accumulator, object) => accumulator + object.episodesMin,
    0
  )
);
const watching = ref(filterMediaStatus(anime, "watching").length);
const completed = ref(filterMediaStatus(anime, "completed").length);
const onHold = ref(filterMediaStatus(anime, "on-hold").length);
const dropped = ref(filterMediaStatus(anime, "dropped").length);
const planToWatch = ref(filterMediaStatus(anime, "Plan to Watch").length);

const favourites = ref(anime.value.filter((anime) => anime.favourites).length);

const handleAnimeSearch = () => {
  console.log(animeSearch.value);
};

onMounted(() => {
  // console.log("ANIME MOUNTED");
});
</script>

<!-- <section class="progress-stacked" style="height: 30px">
  <div class="progress" :style="`width: ${watching}%; height: 100%`">
    <div class="progress-bar bg-green" />
  </div>
  <div class="progress" :style="`width: ${completed}%; height: 100%`">
    <div class="progress-bar bg-blue" />
  </div>
  <div class="progress" :style="`width: ${onHold}%; height: 100%`">
    <div class="progress-bar bg-yellow" />
  </div>
  <div class="progress" :style="`width: ${dropped}%; height: 100%`">
    <div class="progress-bar bg-red" />
  </div>
  <div class="progress" :style="`width: ${planToWatch}%; height: 100%`">
    <div class="progress-bar bg-white" />
  </div>
</section> -->
