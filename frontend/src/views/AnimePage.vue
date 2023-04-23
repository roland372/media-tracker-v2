<template>
  <HeaderComponent title="Anime">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.ANIME"
      :title="`Add ${EMediaType.ANIME}`"
    />
    <SnackbarComponent
      v-if="snackbar"
      :snackbar="snackbar"
      :text="snackbarText"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText @click="formDialog = !formDialog" text="Add Anime" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="animeFetchSearch"
        @click:append-inner="handleFetchAnimeSearch"
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
    :media-type="EMediaType.ANIME"
    :progress="progress"
    :status="status"
    :stats="stats"
    :total-days="totalDays"
  />
  <MediaTable
    v-if="displayFlag === 'table'"
    :media="anime"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      :display-flag="displayFlag"
      :media-type="EMediaType.ANIME"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="
      anime.filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    "
    :media-search="searchTerm"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      :display-flag="displayFlag"
      :media-type="EMediaType.ANIME"
    />
  </MediaComponent>
  <MediaComponent
    :media="orderBy(anime, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.ANIME"
    title="Recent Anime"
  />
  <MediaComponent
    :media-type="EMediaType.ANIME"
    :media="filter(anime, { favourites: true })"
    title="Favourite Anime"
  />
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import MediaTable from "@/components/media/MediaTable.vue";

import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { round, calculatePercentage } from "@/utils/mediaUtils";
import { filterMediaStatus } from "@/utils/mediaUtils";
import { EMediaType, EAnimeStatus } from "@/types";
import { filter, orderBy } from "lodash";

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.ANIME + " Added");
const mediaStore = useMediaStore();
const { anime } = storeToRefs(mediaStore);

const animeFetchSearch = ref<string>("");
const searchTerm = ref("");

const totalAnime = computed(() => anime.value.length);
const filterZeroRating = computed(
  () => anime.value.filter((anime) => anime.rating !== 0).length
);
const totalRating = computed(() =>
  anime.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);
const totalEpisodesSum = computed(() =>
  anime.value.reduce(
    (accumulator, object) => accumulator + object.episodesMax,
    0
  )
);
const watchedEpisodesSum = computed(() =>
  anime.value.reduce(
    (accumulator, object) => accumulator + object.episodesMin,
    0
  )
);
const watching = computed(() => filterMediaStatus(anime, "watching").length);
const completed = computed(() => filterMediaStatus(anime, "completed").length);
const onHold = computed(() => filterMediaStatus(anime, "on-hold").length);
const dropped = computed(() => filterMediaStatus(anime, "dropped").length);
const planToWatch = computed(
  () => filterMediaStatus(anime, "Plan to Watch").length
);
const favourites = computed(
  () => anime.value.filter((anime) => anime.favourites).length
);

const handleFetchAnimeSearch = () => {
  console.log(animeFetchSearch.value);
};

const progress = computed(() => [
  {
    color: "green",
    value: calculatePercentage(watching.value, totalAnime.value),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, totalAnime.value),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, totalAnime.value),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, totalAnime.value),
  },
  {
    color: "white",
    value: calculatePercentage(planToWatch.value, totalAnime.value),
  },
]);

const status = computed(() => [
  { color: "green", name: EAnimeStatus.WATCHING, value: watching },
  { color: "blue", name: EAnimeStatus.COMPLETED, value: completed },
  { color: "yellow", name: EAnimeStatus.ON_HOLD, value: onHold },
  { color: "red", name: EAnimeStatus.DROPPED, value: dropped },
  { color: "white", name: EAnimeStatus.PLAN_TO_WATCH, value: planToWatch },
]);

const stats = computed(() => [
  { name: "Total Anime", value: totalAnime },
  { name: "Favourites", value: favourites },
  { name: "Total Episodes", value: totalEpisodesSum },
  { name: "Watched Episodes", value: watchedEpisodesSum },
  { name: "", value: null },
]);

const totalDays = computed(() => round(watchedEpisodesSum.value / 60, 1));
const meanScore = computed(() =>
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2)
);

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = !snackbar.value;
};

const handleChangeDisplayFlag = () => {
  if (displayFlag.value === "table") {
    displayFlag.value = "grid";
  } else if (displayFlag.value === "grid") {
    displayFlag.value = "table";
  }
};

onMounted(() => {
  // console.log("ANIME MOUNTED");
});
</script>
