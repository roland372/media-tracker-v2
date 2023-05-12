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
        @click:clear="handleClearAnimeSearch"
        @keydown.enter="handleFetchAnimeSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for an Anime"
        variant="outlined"
      />
    </section>
    <section v-if="fetchedAnime?.length" class="grid-container pt-3">
      <section v-for="(item, index) in fetchedAnime" :key="index">
        <v-img
          @click="handleOpenFetchAnimeModal(item)"
          :src="item.images.jpg.image_url"
          class="rounded media-img-card"
          cover
        />
      </section>
    </section>
  </HeaderComponent>
  <FetchedMediaModal
    v-if="fetchedAnimeModal"
    @close-modal="handleCloseFetchAnimeModal"
    :show-modal="fetchedAnimeModal"
    :title="fetchedSingleAnime?.title as string"
    :submit-click="handleFetchedAnimeSubmit"
    :view-more-click="handleFetchedAnimeViewMore"
  >
    <section>
      <div><b>Episodes: </b> {{ fetchedSingleAnime?.episodes }}</div>
      <div><b>Type: </b> {{ fetchedSingleAnime?.type }}</div>
      <div>
        <b>Synopsis:</b>
        {{
          fetchedSingleAnime && fetchedSingleAnime?.synopsis?.length > 200
            ? `${fetchedSingleAnime?.synopsis?.slice(0, 200)}...`
            : fetchedSingleAnime?.synopsis
        }}
      </div>
    </section>
  </FetchedMediaModal>
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
    :media="orderBy(filteredAnime, ['title'], ['asc'])"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleAnimeFilter"
      @search="handleAnimeSearch"
      :display-flag="displayFlag"
      :media-type="EMediaType.ANIME"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="orderBy(filteredAnime, ['title'], ['asc'])"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleAnimeFilter"
      @search="handleAnimeSearch"
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
    :media="orderBy(filter(anime, { favourites: true }), ['title'], ['asc'])"
    title="Favourite Anime"
  />
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import MediaTable from "@/components/media/MediaTable.vue";
import FetchedMediaModal from "@/components/media/FetchedMediaModal.vue";

import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import {
  round,
  calculatePercentage,
  filterMediaStatus,
  fetchMediaURL,
} from "@/utils/mediaUtils";
import { EMediaType, EAnimeStatus, TAnimeInput, EAnimeType } from "@/types";
import { filter, orderBy } from "lodash";
import { Anime } from "@tutkli/jikan-ts";

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const fetchedAnimeModal = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.ANIME + " Added");
const mediaStore = useMediaStore();
const { submitAddAnime } = mediaStore;
const { anime } = storeToRefs(mediaStore);
const fetchedAnime = ref<Anime[]>();
const fetchedSingleAnime = ref<Anime>();

const animeFetchSearch = ref<string>("");
const searchTerm = ref<string>("");
const animeFilter = ref<string>("");

const filteredAnime = computed(() =>
  anime.value.filter((el) => {
    const searchTermMatch = el.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const statusMatch =
      animeFilter.value === "" || el.status === animeFilter.value;
    return searchTermMatch && statusMatch;
  })
);

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

const handleAnimeSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);
const handleAnimeFilter = (emittedValue: string) =>
  (animeFilter.value = emittedValue);

const handleFetchAnimeSearch = async () => {
  if (animeFetchSearch.value.length) {
    const fetchAnime = await fetch(
      fetchMediaURL("anime", animeFetchSearch.value, "members", "desc")
    ).then((res) => res.json());

    fetchedAnime.value = fetchAnime.data;
  } else {
    console.log("empty search");
  }
};

const handleClearAnimeSearch = () => {
  animeFetchSearch.value = "";
  fetchedAnime.value = [];
};

const handleOpenFetchAnimeModal = (item: Anime) => {
  fetchedSingleAnime.value = item;
  fetchedAnimeModal.value = !fetchedAnimeModal.value;
};
const handleCloseFetchAnimeModal = () => {
  fetchedAnimeModal.value = !fetchedAnimeModal.value;
};
const handleFetchedAnimeViewMore = () => {
  window.open(fetchedSingleAnime.value?.url, "_blank");
};

const handleFetchedAnimeSubmit = async () => {
  const fetchedAnime: TAnimeInput = reactive({
    episodesMax: fetchedSingleAnime.value?.episodes
      ? fetchedSingleAnime.value?.episodes
      : 0,
    episodesMin: 0,
    favourites: false,
    imageURL: fetchedSingleAnime.value?.images.jpg.image_url,
    link1: fetchedSingleAnime.value?.url,
    link1Name: "MAL",
    link2: "",
    link2Name: "",
    mal_id: fetchedSingleAnime.value?.mal_id as number,
    rating: 0,
    status: EAnimeStatus.PLAN_TO_WATCH,
    title: fetchedSingleAnime.value?.title as string,
    type: EAnimeType.TV_SHOW,
  });

  await submitAddAnime(fetchedAnime);
  fetchedAnimeModal.value = false;
  snackbar.value = !snackbar.value;
};
</script>
