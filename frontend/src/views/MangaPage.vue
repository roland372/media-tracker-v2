<template>
  <HeaderComponent title="Manga">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @submit="handleSubmit"
      @close="formDialog = !formDialog"
      :media-type="EMediaType.MANGA"
      :title="`Add ${EMediaType.MANGA}`"
    />
    <SnackbarComponent
      v-if="snackbar"
      :snackbar="snackbar"
      :text="snackbarText"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText
        @click="formDialog = !formDialog"
        color="indigo"
        text="Add Manga"
      />
      <div class="px-3 text-color">
        <p>or</p>
      </div>
      <v-text-field
        v-model="mangaFetchSearch"
        @click:append-inner="handleFetchMangaSearch"
        @click:clear="handleClearMangaSearch"
        @keydown.enter="handleFetchMangaSearch"
        append-inner-icon="mdi-magnify"
        class="text-color"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for a Manga"
        variant="outlined"
      />
    </section>
    <section v-if="fetchedManga?.length" class="grid-container pt-3">
      <section v-for="(item, index) in fetchedManga" :key="index">
        <v-img
          @click="handleOpenFetchMangaModal(item)"
          :src="item.images.jpg.image_url"
          class="rounded media-img-card image-hover"
          cover
        />
      </section>
    </section>
  </HeaderComponent>
  <FetchedMediaModal
    v-if="fetchedMangaModal"
    @close-modal="handleCloseFetchMangaModal"
    :show-modal="fetchedMangaModal"
    :title="fetchedSingleManga?.title as string"
    :submit-click="handleFetchedMangaSubmit"
    :view-more-click="handleFetchedMangaViewMore"
  >
    <section>
      <div><b>Chapters: </b> {{ fetchedSingleManga?.chapters }}</div>
      <div><b>Volumes: </b> {{ fetchedSingleManga?.volumes }}</div>
      <div><b>Type: </b> {{ fetchedSingleManga?.type }}</div>
      <div>
        <b>Synopsis:</b>
        {{
          fetchedSingleManga && fetchedSingleManga?.synopsis?.length > 200
            ? `${fetchedSingleManga?.synopsis?.slice(0, 200)}...`
            : fetchedSingleManga?.synopsis
        }}
      </div>
    </section>
  </FetchedMediaModal>
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
    :media="orderBy(filteredManga, ['title'], ['asc'])"
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
    :media="orderBy(filteredManga, ['title'], ['asc'])"
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
    :media="orderBy(filter(manga, { favourites: true }), ['title'], ['asc'])"
    title="Favourite Manga"
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
  fetchMediaURL,
  filterMediaStatus,
} from "@/utils/mediaUtils";
import { EMediaType, EMangaStatus, TMangaInput, EMangaType } from "@/types";
import { filter, orderBy } from "lodash";
import { Manga } from "@tutkli/jikan-ts";

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const fetchedMangaModal = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.MANGA + " Added");
const mediaStore = useMediaStore();
const { submitAddManga, userFromDB } = mediaStore;
const { manga } = storeToRefs(mediaStore);
const fetchedManga = ref<Manga[]>();
const fetchedSingleManga = ref<Manga>();

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

const handleFetchMangaSearch = async () => {
  if (mangaFetchSearch.value.length) {
    const fetchManga = await fetch(
      fetchMediaURL("manga", mangaFetchSearch.value, "members", "desc")
    ).then((res) => res.json());

    fetchedManga.value = fetchManga.data;
  } else {
    console.log("empty search");
  }
};

const handleClearMangaSearch = () => {
  mangaFetchSearch.value = "";
  fetchedManga.value = [];
};

const handleOpenFetchMangaModal = (item: Manga) => {
  fetchedSingleManga.value = item;
  fetchedMangaModal.value = !fetchedMangaModal.value;
};
const handleCloseFetchMangaModal = () => {
  fetchedMangaModal.value = !fetchedMangaModal.value;
};
const handleFetchedMangaViewMore = () => {
  window.open(fetchedSingleManga.value?.url, "_blank");
};

const handleFetchedMangaSubmit = async () => {
  const fetchedManga: TMangaInput = reactive({
    chaptersMax: fetchedSingleManga.value?.chapters
      ? fetchedSingleManga.value?.chapters
      : 0,
    chaptersMin: 0,
    favourites: false,
    imageURL: fetchedSingleManga.value?.images.jpg.image_url,
    link1: fetchedSingleManga.value?.url,
    link1Name: "MAL",
    link2: "",
    link2Name: "",
    mal_id: fetchedSingleManga.value?.mal_id,
    owner: userFromDB?.email as string,
    rating: 0,
    status: EMangaStatus.PLAN_TO_READ,
    title: fetchedSingleManga.value?.title as string,
    type: EMangaType.MANGA,
    volumesMax: fetchedSingleManga.value?.volumes
      ? fetchedSingleManga.value?.volumes
      : 0,
    volumesMin: 0,
  });

  await submitAddManga(fetchedManga);
  fetchedMangaModal.value = false;
  snackbar.value = !snackbar.value;
};
</script>
