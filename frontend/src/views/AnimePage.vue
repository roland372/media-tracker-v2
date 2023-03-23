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
  <StatsComponent
    :mean-score="meanScore"
    media="Anime"
    :progress="progress"
    :status="status"
    :stats="stats"
    :total-days="totalDays"
  />
  <MediaComponent
    all-media
    :media="allAnime"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  />
  <!-- <MediaComponent
    :media="recentAnime.slice(0, 20)"
    :media-type="EMediaType.ANIME"
    title="Recent Anime"
  />
  <MediaComponent
    :media-type="EMediaType.ANIME"
    :media="favouriteAnime"
    title="Favourite Anime"
  /> -->
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import {
  sortMediaByDate,
  favouriteMedia,
  sortArrayByPropertyASC,
} from "@/utils/mediaUtils";
import { filterMediaStatus } from "@/utils/mediaUtils";
import { EMediaType, TAnime } from "@/types";

const mediaStore = useMediaStore();
const { anime } = storeToRefs(mediaStore);

const animeSearch = ref<string>("");
const allAnime: TAnime[] = sortArrayByPropertyASC(anime, "title");
const recentAnime: TAnime[] = sortMediaByDate(anime);
const favouriteAnime: TAnime[] = favouriteMedia(anime);

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

const progress = [
  {
    color: "green",
    value: calculatePercentage(watching.value, anime.value.length),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, anime.value.length),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, anime.value.length),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, anime.value.length),
  },
  {
    color: "white",
    value: calculatePercentage(planToWatch.value, anime.value.length),
  },
];

const status = [
  { color: "green", name: "Watching", value: watching },
  { color: "blue", name: "Completed", value: completed },
  { color: "yellow", name: "On-Hold", value: onHold },
  { color: "red", name: "Dropped", value: dropped },
  { color: "white", name: "Plan to Watch", value: planToWatch },
];

const stats = [
  { name: "Total Anime", value: anime.value.length },
  { name: "Favourites", value: favourites },
  { name: "Total Episodes", value: totalEpisodesSum },
  { name: "Watched Episodes", value: watchedEpisodesSum },
  { name: "", value: null },
];

const totalDays = round(watchedEpisodesSum.value / 60, 1);
const meanScore =
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2);

onMounted(() => {
  // console.log("ANIME MOUNTED");
});
</script>
