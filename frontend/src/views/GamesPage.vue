<template>
  <HeaderComponent title="Games">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.GAME"
      :title="`Add ${EMediaType.GAME}`"
    />
    <SnackbarComponent
      v-if="snackbar"
      :snackbar="snackbar"
      :text="snackbarText"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText @click="formDialog = !formDialog" text="Add Game" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="gameSearch"
        @click:append-inner="handleGameSearch"
        append-inner-icon="mdi-magnify"
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
  <MediaComponent
    all-media
    :media="allGames"
    :media-type="EMediaType.GAME"
    title="All Games"
  />
  <MediaComponent
    :media="recentGames.slice(0, 20)"
    :media-type="EMediaType.GAME"
    title="Recent Games"
  />
  <MediaComponent
    :media-type="EMediaType.GAME"
    :media="favouriteGames"
    title="Favourite Games"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import {
  sortMediaByDate,
  favouriteMedia,
  sortArrayByPropertyASC,
  round,
  calculatePercentage,
} from "@/utils/mediaUtils";
import { filterMediaStatus } from "@/utils/mediaUtils";
import { EMediaType, TGame } from "@/types";

const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.GAME + " Added");
const mediaStore = useMediaStore();
const { games } = storeToRefs(mediaStore);

const gameSearch = ref<string>("");
const allGames: TGame[] = sortArrayByPropertyASC(games, "title");
const recentGames: TGame[] = sortMediaByDate(games);
const favouriteGames: TGame[] = favouriteMedia(games);

const filterZeroRating = ref(
  games.value.filter((games) => games.rating !== 0).length
);
const totalRating = ref(
  games.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);
const totalPlaytime = games.value.reduce((accumulator, object) => {
  return accumulator + object.playtime;
}, 0);

const playing = ref(filterMediaStatus(games, "playing").length);
const completed = ref(filterMediaStatus(games, "completed").length);
const onHold = ref(filterMediaStatus(games, "on-hold").length);
const dropped = ref(filterMediaStatus(games, "dropped").length);
const planToPlay = ref(filterMediaStatus(games, "Plan to Play").length);
const favourites = ref(games.value.filter((games) => games.favourites).length);

const handleGameSearch = () => {
  console.log(gameSearch.value);
};

const progress = [
  {
    color: "green",
    value: calculatePercentage(playing.value, games.value.length),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, games.value.length),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, games.value.length),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, games.value.length),
  },
  {
    color: "white",
    value: calculatePercentage(planToPlay.value, games.value.length),
  },
];

const status = [
  { color: "green", name: "Playing", value: playing },
  { color: "blue", name: "Completed", value: completed },
  { color: "yellow", name: "On-Hold", value: onHold },
  { color: "red", name: "Dropped", value: dropped },
  { color: "white", name: "Plan to Play", value: planToPlay },
];

const stats = [
  { name: "Total Games", value: games.value.length },
  { name: "Favourites", value: favourites },
  { name: "Playtime", value: totalPlaytime + " hours" },
];

const totalDays = round(totalPlaytime / 24, 1);
const meanScore =
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2);

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = !snackbar.value;
};

onMounted(() => {
  // console.log("GAMES MOUNTED");
});
</script>
