<template>
  <HeaderComponent title="Games">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @close="formDialog = !formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.GAME"
      :title="`Add ${EMediaType.GAME}`"
    />
    <SnackbarComponent v-model="snackbar" :text="snackbarText" />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText
        @click="formDialog = !formDialog"
        color="indigo"
        text="Add Game"
      />
      <div class="px-3 text-color">
        <p>or</p>
      </div>
      <v-text-field
        v-model="gameFetchSearch"
        @click:append-inner="handleFetchGameSearch"
        append-inner-icon="mdi-magnify"
        class="text-color"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for a Game"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent
    :mean-score="meanScore"
    :media-type="EMediaType.GAME"
    :progress="progress"
    :status="status"
    :stats="stats"
    :total-days="totalDays"
  />
  <MediaTable
    v-if="displayFlag === 'table'"
    :media="filteredGames"
    :media-type="EMediaType.GAME"
    title="All Games"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleGameFilter"
      @search="handleGameSearch"
      @sort="handleGameSort"
      :display-flag="displayFlag"
      :media-type="EMediaType.GAME"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="filteredGames"
    :media-type="EMediaType.GAME"
    title="All Games"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleGameFilter"
      @search="handleGameSearch"
      @sort="handleGameSort"
      :display-flag="displayFlag"
      :media-type="EMediaType.GAME"
    />
  </MediaComponent>
  <MediaComponent
    :media="orderBy(games, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.GAME"
    title="Recent Games"
  />
  <MediaComponent
    :media-type="EMediaType.GAME"
    :media="orderBy(filter(games, { favourites: true }), ['title'], ['asc'])"
    title="Favourite Games"
  />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { filter, orderBy } from "lodash";
import {
  calculatePercentage,
  filterMediaStatus,
  round,
} from "@/utils/mediaUtils";
import ButtonText from "@/components/ui/ButtonText.vue";
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import MediaTable from "@/components/media/MediaTable.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import { EGameStatus, EMediaType, TSortingOptions } from "@/types";

const mediaStore = useMediaStore();
const { games } = storeToRefs(mediaStore);

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const searchTerm = ref<string>("");
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.GAME + " Added");
const gameFilter = ref<string>("");
const gameFetchSearch = ref<string>("");
const sortingOptions = ref<TSortingOptions>({
  sortField: "title",
  sortOrder: "asc",
});

const favourites = computed(
  () => games.value.filter((games) => games.favourites).length
);

const filteredGames = computed(() => {
  const filteredItems = games.value.filter((el) => {
    const searchTermMatch = el.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const statusMatch =
      gameFilter.value === "" || el.status === gameFilter.value;
    return searchTermMatch && statusMatch;
  });

  const sortedGames = orderBy(
    filteredItems,
    [sortingOptions.value.sortField],
    [sortingOptions.value.sortOrder]
  );

  return sortedGames;
});

const filterZeroRating = computed(
  () => games.value.filter((games) => games.rating !== 0).length
);

const totalDays = computed(() => round(totalPlaytime.value / 24, 1));
const totalGames = computed(() => games.value.length);
const totalPlaytime = computed(() =>
  games.value.reduce((accumulator, object) => {
    return accumulator + object.playtime;
  }, 0)
);

const totalRating = computed(() =>
  games.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const meanScore = computed(() =>
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2)
);

const playing = computed(() => filterMediaStatus(games, "playing").length);
const completed = computed(() => filterMediaStatus(games, "completed").length);
const onHold = computed(() => filterMediaStatus(games, "on-hold").length);
const dropped = computed(() => filterMediaStatus(games, "dropped").length);
const planToPlay = computed(
  () => filterMediaStatus(games, "Plan to Play").length
);

const progress = computed(() => [
  {
    color: "green",
    value: calculatePercentage(playing.value, totalGames.value),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, totalGames.value),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, totalGames.value),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, totalGames.value),
  },
  {
    color: "white",
    value: calculatePercentage(planToPlay.value, totalGames.value),
  },
]);

const status = computed(() => [
  { color: "green", name: EGameStatus.PLAYING, value: playing },
  { color: "blue", name: EGameStatus.COMPLETED, value: completed },
  { color: "yellow", name: EGameStatus.ON_HOLD, value: onHold },
  { color: "red", name: EGameStatus.DROPPED, value: dropped },
  { color: "white", name: EGameStatus.PLAN_TO_PLAY, value: planToPlay },
]);

const stats = computed(() => [
  { name: "Total Games", value: totalGames.value },
  { name: "Favourites", value: favourites },
  { name: "Playtime", value: totalPlaytime.value + " hours" },
]);

const handleChangeDisplayFlag = () => {
  if (displayFlag.value === "table") {
    displayFlag.value = "grid";
  } else if (displayFlag.value === "grid") {
    displayFlag.value = "table";
  }
};

const handleFetchGameSearch = () => {
  console.log(gameFetchSearch.value);
};

const handleGameFilter = (emittedValue: string) =>
  (gameFilter.value = emittedValue);

const handleGameSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);

const handleGameSort = (emittedValue: TSortingOptions) =>
  (sortingOptions.value = emittedValue);

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = true;
};
</script>
