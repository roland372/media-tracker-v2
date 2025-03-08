<template>
  <StatsComponent :mean-score="meanScore" :media-type="EMediaType.MANGA" :progress="progress" :status="status"
    :stats="stats" :total-days="totalDays" />
  <MediaTable v-if="displayFlag === 'table'" :media="filteredManga" :media-type="EMediaType.MANGA" title="All Manga">
    <DisplayFilterSearchPanel @display="handleChangeDisplayFlag" @filter="handleMangaFilter"
      @filter-type="handleMangaFilterType" @search="handleMangaSearch" @sort="handleMangaSort"
      :display-flag="displayFlag" :filter-type="mangaType" :media-status="status" :media-type="EMediaType.MANGA"
      :sort-fields="sortFields" />
  </MediaTable>
  <MediaComponent v-if="displayFlag === 'grid'" all-media :media="filteredManga" :media-type="EMediaType.MANGA"
    title="All Manga">
    <DisplayFilterSearchPanel @display="handleChangeDisplayFlag" @filter="handleMangaFilter"
      @filter-type="handleMangaFilterType" @search="handleMangaSearch" @sort="handleMangaSort"
      :display-flag="displayFlag" :filter-type="mangaType" :media-status="status" :media-type="EMediaType.MANGA"
      :sort-fields="sortFields" />
  </MediaComponent>
  <MediaComponent :media="orderBy(manga, ['updatedAt'], ['desc']).slice(0, 20)" :media-type="EMediaType.MANGA"
    title="Recent Manga" />
  <MediaComponent :media-type="EMediaType.MANGA"
    :media="orderBy(filter(manga, { favourites: true }), ['title'], ['asc'])" title="Favourite Manga" />
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
import DisplayFilterSearchPanel from "@/components/media/DisplayFilterSearchPanel.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import MediaTable from "@/components/media/MediaTable.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import { TSortingOptions } from "@/types";
import { EMangaStatus, EMangaType, EMediaType } from "@/types";

const mediaStore = useMediaStore();
const { manga } = storeToRefs(mediaStore);

const displayFlag = ref<string>("grid");
const searchTerm = ref<string>("");
const mangaFilter = ref<string>("");
const mangaType = ref<string[]>([...Object.values(EMangaType)]);
const sortingOptions = ref<TSortingOptions>({
  sortField: "title",
  sortOrder: "asc",
});
const sortFields = [
  {
    label: "Chapters",
    value: "chaptersMin",
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
  {
    label: "Volumes",
    value: "volumesMin",
  },
];

const favourites = computed(
  () => manga.value.filter((manga) => manga.favourites).length
);

const filteredManga = computed(() => {
  if (mangaType.value.length === 0) {
    return [];
  }

  const filteredItems = manga.value.filter((el) => {
    const searchTermMatch = el.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const statusMatch =
      mangaFilter.value === "" || el.status === mangaFilter.value;

    const typeMatch =
      mangaType.value.length === 0 || mangaType.value.includes(el.type);

    return searchTermMatch && statusMatch && typeMatch;
  });

  const sortedManga = orderBy(
    filteredItems,
    [sortingOptions.value.sortField],
    [sortingOptions.value.sortOrder]
  );

  return sortedManga;
});

const filterZeroRating = computed(
  () => manga.value.filter((manga) => manga.rating !== 0).length
);

const filteredMangaVolumes = computed(() =>
  manga.value
    .filter((manga) => manga.type === "Manga")
    .reduce((accumulator, object) => {
      return accumulator + object.volumesMin;
    }, 0)
);

const filteredLightNovelVolumes = computed(() =>
  manga.value
    .filter((manga) => manga.type === "Light Novel")
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

const readChaptersSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.chaptersMin,
    0
  )
);

const readVolumesSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.volumesMin,
    0
  )
);

const totalChaptersSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.chaptersMax,
    0
  )
);

const totalDays = computed(() =>
  round(
    (filteredMangaVolumes.value * 1) / 24 +
    (filteredWebtoonChapters.value * (1 / 12)) / 24 +
    (filteredLightNovelVolumes.value * 6) / 24,
    1
  )
);

const totalManga = computed(() => manga.value.length);
const totalRating = computed(() =>
  manga.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const totalVolumesSum = computed(() =>
  manga.value.reduce(
    (accumulator, object) => accumulator + object.volumesMax,
    0
  )
);

const meanScore = computed(() =>
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2)
);

const reading = computed(() => filterMediaStatus(manga, "reading").length);
const completed = computed(() => filterMediaStatus(manga, "completed").length);
const onHold = computed(() => filterMediaStatus(manga, "on-hold").length);
const dropped = computed(() => filterMediaStatus(manga, "dropped").length);
const planToRead = computed(
  () => filterMediaStatus(manga, "Plan to Read").length
);

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

const handleChangeDisplayFlag = () => {
  if (displayFlag.value === "table") {
    displayFlag.value = "grid";
  } else if (displayFlag.value === "grid") {
    displayFlag.value = "table";
  }
};

const handleMangaFilter = (emittedValue: string) =>
  (mangaFilter.value = emittedValue);

const handleMangaFilterType = (emittedValue: string[]) =>
  (mangaType.value = emittedValue);

const handleMangaSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);

const handleMangaSort = (emittedValue: TSortingOptions) =>
  (sortingOptions.value = emittedValue);
</script>
