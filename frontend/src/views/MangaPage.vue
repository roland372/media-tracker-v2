<template>
  <HeaderComponent title="Manga">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.MANGA"
      :title="`Add ${EMediaType.MANGA}`"
    />
    <SnackbarComponent
      v-if="snackbar"
      :snackbar="snackbar"
      :text="snackbarText"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText @click="formDialog = !formDialog" text="Add Manga" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="mangaFetchSearch"
        @click:append-inner="handleFetchMangaSearch"
        append-inner-icon="mdi-magnify"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for Manga"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent
    :mean-score="meanScore"
    :media-type="EMediaType.MANGA"
    :progress="progress"
    :status="status"
    :stats="stats"
    :total-days="totalDays"
  />
  <MediaTable
    v-if="displayFlag === 'table'"
    :media="filteredManga"
    :media-type="EMediaType.MANGA"
    title="All Manga"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleMangaFilter"
      @search="handleMangaSearch"
      :display-flag="displayFlag"
      :media-type="EMediaType.MANGA"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="filteredManga"
    :media-type="EMediaType.MANGA"
    title="All Manga"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleMangaFilter"
      @search="handleMangaSearch"
      :display-flag="displayFlag"
      :media-type="EMediaType.MANGA"
    />
  </MediaComponent>
  <MediaComponent
    :media="orderBy(manga, ['lastModified'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.MANGA"
    title="Recent Manga"
  />
  <MediaComponent
    :media-type="EMediaType.MANGA"
    :media="filter(manga, { favourites: true })"
    title="Favourite Manga"
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
import { EMediaType, EMangaStatus } from "@/types";
import { filter, orderBy } from "lodash";

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.MANGA + " Added");
const mediaStore = useMediaStore();
const { manga } = storeToRefs(mediaStore);

const mangaFetchSearch = ref<string>("");
const searchTerm = ref<string>("");
const mangaFilter = ref<string>("");

const filteredManga = computed(() =>
  manga.value.filter((el) => {
    const searchTermMatch = el.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const statusMatch =
      mangaFilter.value === "" || el.status === mangaFilter.value;
    return searchTermMatch && statusMatch;
  })
);

const totalManga = computed(() => manga.value.length);
const filterZeroRating = computed(
  () => manga.value.filter((manga) => manga.rating !== 0).length
);
const totalRating = computed(() =>
  manga.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);
const totalChaptersSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.chaptersMax,
    0
  )
);
const readChaptersSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.chaptersMin,
    0
  )
);
const totalVolumesSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.volumesMax,
    0
  )
);
const readVolumesSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.volumesMin,
    0
  )
);
const reading = computed(() => filterMediaStatus(manga, "reading").length);
const completed = computed(() => filterMediaStatus(manga, "completed").length);
const onHold = computed(() => filterMediaStatus(manga, "on-hold").length);
const dropped = computed(() => filterMediaStatus(manga, "dropped").length);
const planToRead = computed(
  () => filterMediaStatus(manga, "Plan to Read").length
);
const favourites = computed(
  () => manga.value.filter((manga) => manga.favourites).length
);

const filteredMangaVolumes = computed(() =>
  manga.value
    .filter((manga) => manga.type === "Manga")
    .reduce((accumulator, object) => {
      return accumulator + object.volumesMin;
    }, 0)
);

const filteredWebtoonChapters = computed(() =>
  manga.value
    .filter((manga) => manga.type === "Webtoon")
    .reduce((accumulator, object) => {
      return accumulator + object.chaptersMin;
    }, 0)
);

const filteredLightNovelVolumes = computed(() =>
  manga.value
    .filter((manga) => manga.type === "Light Novel")
    .reduce((accumulator, object) => {
      return accumulator + object.volumesMin;
    }, 0)
);

const handleFetchMangaSearch = () => {
  console.log(mangaFetchSearch.value);
};

const progress = computed(() => [
  {
    color: "green",
    value: calculatePercentage(reading.value, totalManga.value),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, totalManga.value),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, totalManga.value),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, totalManga.value),
  },
  {
    color: "white",
    value: calculatePercentage(planToRead.value, totalManga.value),
  },
]);

const status = computed(() => [
  { color: "green", name: EMangaStatus.READING, value: reading },
  { color: "blue", name: EMangaStatus.COMPLETED, value: completed },
  { color: "yellow", name: EMangaStatus.ON_HOLD, value: onHold },
  { color: "red", name: EMangaStatus.DROPPED, value: dropped },
  { color: "white", name: EMangaStatus.PLAN_TO_READ, value: planToRead },
]);

const stats = computed(() => [
  { name: "Total Manga", value: totalManga.value },
  { name: "Favourites", value: favourites },
  { name: "Total Chapters", value: totalChaptersSum },
  { name: "Read Chapters", value: readChaptersSum },
  { name: "Total Volumes", value: totalVolumesSum },
  { name: "Read Volumes", value: readVolumesSum },
]);

const totalDays = computed(() =>
  round(
    (filteredMangaVolumes.value * 1) / 24 +
      (filteredWebtoonChapters.value * (1 / 12)) / 24 +
      (filteredLightNovelVolumes.value * 6) / 24,
    1
  )
);
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

const handleMangaSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);
const handleMangaFilter = (emittedValue: string) =>
  (mangaFilter.value = emittedValue);

onMounted(() => {
  // console.log("MANGA MOUNTED");
});
</script>
