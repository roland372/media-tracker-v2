<template>
  <HeaderComponent title="Anime">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @close="formDialog = !formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.ANIME"
      :title="`Add ${EMediaType.ANIME}`"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText
        @click="formDialog = !formDialog"
        color="indigo"
        text="Add Anime"
      />
      <div class="px-3 text-color">
        <p>or</p>
      </div>
      <v-text-field
        v-model="animeFetchSearch"
        @click:append-inner="handleFetchAnimeSearch"
        @click:clear="handleClearAnimeSearch"
        @keydown.enter="handleFetchAnimeSearch"
        append-inner-icon="mdi-magnify"
        class="text-color"
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
          class="rounded media-img-card image-hover"
          cover
          :src="item.images.jpg.image_url"
        />
      </section>
    </section>
  </HeaderComponent>
  <FetchedMediaModal
    v-if="fetchedAnimeModal"
    @close-modal="handleCloseFetchAnimeModal"
    :show-modal="fetchedAnimeModal"
    :submit-click="handleFetchedAnimeSubmit"
    :title="fetchedSingleAnime?.title as string"
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
    :media="filteredAnime"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleAnimeFilter"
      @filter-type="handleAnimeFilterType"
      @search="handleAnimeSearch"
      @sort="handleAnimeSort"
      :display-flag="displayFlag"
      :filter-type="animeType"
      :media-status="status"
      :media-type="EMediaType.ANIME"
      :sort-fields="sortFields"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="filteredAnime"
    :media-type="EMediaType.ANIME"
    title="All Anime"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleAnimeFilter"
      @filter-type="handleAnimeFilterType"
      @search="handleAnimeSearch"
      @sort="handleAnimeSort"
      :display-flag="displayFlag"
      :filter-type="animeType"
      :media-status="status"
      :media-type="EMediaType.ANIME"
      :sort-fields="sortFields"
    />
  </MediaComponent>
  <MediaComponent
    :media="orderBy(anime, ['updatedAt'], ['desc']).slice(0, 20)"
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
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { filter, orderBy } from "lodash";
import {
  calculatePercentage,
  fetchMediaURL,
  filterMediaStatus,
  round,
} from "@/utils/mediaUtils";
import ButtonText from "@/components/ui/ButtonText.vue";
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import FetchedMediaModal from "@/components/media/FetchedMediaModal.vue";
import FormComponent from "@/components/media/FormComponent.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import MediaTable from "@/components/media/MediaTable.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import { Anime } from "@tutkli/jikan-ts";
import { TAnimeInput, TSortingOptions } from "@/types";
import { EAnimeStatus, EAnimeType, EMediaType } from "../../../common/types";

const mediaStore = useMediaStore();
const { submitAddAnime, userFromDB } = mediaStore;
const { anime } = storeToRefs(mediaStore);

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const fetchedAnime = ref<Anime[]>();
const fetchedSingleAnime = ref<Anime>();
const fetchedAnimeModal = ref<boolean>(false);
const searchTerm = ref<string>("");
const animeFetchSearch = ref<string>("");
const animeFilter = ref<string>("");
const animeType = ref<string[]>([...Object.values(EAnimeType)]);
const sortingOptions = ref<TSortingOptions>({
  sortField: "title",
  sortOrder: "asc",
});
const sortFields = [
  {
    label: "Progress",
    value: "episodesMin",
  },
  {
    label: "Rating",
    value: "rating",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Type",
    value: "type",
  },
];

const favourites = computed(
  () => anime.value.filter((anime) => anime.favourites).length
);

const filteredAnime = computed(() => {
  if (animeType.value.length === 0) {
    return [];
  }

  const filteredItems = anime.value.filter((el) => {
    const searchTermMatch = el.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const statusMatch =
      animeFilter.value === "" || el.status === animeFilter.value;
    const typeMatch =
      animeType.value.length === 0 || animeType.value.includes(el.type);

    return searchTermMatch && statusMatch && typeMatch;
  });

  const sortedAnime = orderBy(
    filteredItems,
    [sortingOptions.value.sortField],
    [sortingOptions.value.sortOrder]
  );

  return sortedAnime;
});

const filterZeroRating = computed(
  () => anime.value.filter((anime) => anime.rating !== 0).length
);

const watchedEpisodesSum = computed(() =>
  anime.value.reduce(
    (accumulator, object) => accumulator + object.episodesMin,
    0
  )
);

const totalAnime = computed(() => anime.value.length);
const totalDays = computed(() => round(watchedEpisodesSum.value / 60, 1));
const totalEpisodesSum = computed(() =>
  anime.value.reduce(
    (accumulator, object) => accumulator + object.episodesMax,
    0
  )
);

const totalRating = computed(() =>
  anime.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const meanScore = computed(() =>
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2)
);

const watching = computed(() => filterMediaStatus(anime, "watching").length);
const completed = computed(() => filterMediaStatus(anime, "completed").length);
const onHold = computed(() => filterMediaStatus(anime, "on-hold").length);
const dropped = computed(() => filterMediaStatus(anime, "dropped").length);
const planToWatch = computed(
  () => filterMediaStatus(anime, "Plan to Watch").length
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

const handleAnimeFilter = (emittedValue: string) =>
  (animeFilter.value = emittedValue);

const handleAnimeFilterType = (emittedValue: string[]) =>
  (animeType.value = emittedValue);

const handleAnimeSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);

const handleAnimeSort = (emittedValue: TSortingOptions) =>
  (sortingOptions.value = emittedValue);

const handleChangeDisplayFlag = () => {
  if (displayFlag.value === "table") {
    displayFlag.value = "grid";
  } else if (displayFlag.value === "grid") {
    displayFlag.value = "table";
  }
};

const handleClearAnimeSearch = () => {
  animeFetchSearch.value = "";
  fetchedAnime.value = [];
};

const handleCloseFetchAnimeModal = () => {
  fetchedAnimeModal.value = !fetchedAnimeModal.value;
};

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

const handleFetchedAnimeSubmit = async () => {
  const fetchedAnime: TAnimeInput = reactive({
    episodesMax: fetchedSingleAnime.value?.episodes
      ? fetchedSingleAnime.value?.episodes
      : 0,
    episodesMin: 0,
    favourites: false,
    imageURL: fetchedSingleAnime.value?.images.jpg.image_url as string,
    link: fetchedSingleAnime.value?.url as string,
    linkName: "MAL",
    mal_id: fetchedSingleAnime.value?.mal_id as number,
    owner: userFromDB?.email as string,
    rating: 0,
    status: EAnimeStatus.PLAN_TO_WATCH,
    title: fetchedSingleAnime.value?.title as string,
    type: EAnimeType.TV_SHOW,
  });

  await submitAddAnime(fetchedAnime);
  fetchedAnimeModal.value = false;
};

const handleFetchedAnimeViewMore = () => {
  window.open(fetchedSingleAnime.value?.url, "_blank");
};

const handleOpenFetchAnimeModal = (item: Anime) => {
  fetchedSingleAnime.value = item;
  fetchedAnimeModal.value = !fetchedAnimeModal.value;
};

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
};
</script>
