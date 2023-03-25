<template>
  <HeaderComponent title="Manga">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      :media-type="EMediaType.MANGA"
      title="Add Manga"
    />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText @click="formDialog = !formDialog" text="Add Manga" />
      <div class="px-3">
        <p>or</p>
      </div>
      <v-text-field
        v-model="mangaSearch"
        @click:append-inner="handleMangaSearch"
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
  <MediaComponent
    all-media
    :media="allManga"
    :media-type="EMediaType.MANGA"
    title="All Manga"
  />
  <MediaComponent
    :media="recentManga.slice(0, 20)"
    :media-type="EMediaType.MANGA"
    title="Recent Manga"
  />
  <MediaComponent
    :media-type="EMediaType.MANGA"
    :media="favouriteManga"
    title="Favourite Manga"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import StatsComponent from "@/components/media/StatsComponent.vue";
import MediaComponent from "@/components/media/MediaComponent.vue";
import FormComponent from "@/components/media/FormComponent.vue";
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
import { EMediaType, TManga } from "@/types";

const formDialog = ref<boolean>(false);
const mediaStore = useMediaStore();
const { manga } = storeToRefs(mediaStore);

const mangaSearch = ref<string>("");
const allManga: TManga[] = sortArrayByPropertyASC(manga, "title");
const recentManga: TManga[] = sortMediaByDate(manga);
const favouriteManga: TManga[] = favouriteMedia(manga);

const filterZeroRating = ref(
  manga.value.filter((manga) => manga.rating !== 0).length
);
const totalRating = ref(
  manga.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);
const totalChaptersSum = ref(
  manga.value.reduce(
    (accumulator, object) => accumulator + object.chaptersMax,
    0
  )
);
const readChaptersSum = ref(
  manga.value.reduce(
    (accumulator, object) => accumulator + object.chaptersMin,
    0
  )
);
const totalVolumesSum = ref(
  manga.value.reduce(
    (accumulator, object) => accumulator + object.volumesMax,
    0
  )
);
const readVolumesSum = ref(
  manga.value.reduce(
    (accumulator, object) => accumulator + object.volumesMin,
    0
  )
);
const reading = ref(filterMediaStatus(manga, "reading").length);
const completed = ref(filterMediaStatus(manga, "completed").length);
const onHold = ref(filterMediaStatus(manga, "on-hold").length);
const dropped = ref(filterMediaStatus(manga, "dropped").length);
const planToRead = ref(filterMediaStatus(manga, "Plan to Read").length);
const favourites = ref(manga.value.filter((manga) => manga.favourites).length);

const filteredMangaVolumes = ref(
  manga.value
    .filter((manga) => manga.type === "Manga")
    .reduce((accumulator, object) => {
      return accumulator + object.volumesMin;
    }, 0)
);

const filteredWebtoonChapters = ref(
  manga.value
    .filter((manga) => manga.type === "Webtoon")
    .reduce((accumulator, object) => {
      return accumulator + object.chaptersMin;
    }, 0)
);

const filteredLightNovelVolumes = ref(
  manga.value
    .filter((manga) => manga.type === "Light Novel")
    .reduce((accumulator, object) => {
      return accumulator + object.volumesMin;
    }, 0)
);

const handleMangaSearch = () => {
  console.log(mangaSearch.value);
};

const progress = [
  {
    color: "green",
    value: calculatePercentage(reading.value, manga.value.length),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, manga.value.length),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, manga.value.length),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, manga.value.length),
  },
  {
    color: "white",
    value: calculatePercentage(planToRead.value, manga.value.length),
  },
];

const status = [
  { color: "green", name: "Reading", value: reading },
  { color: "blue", name: "Completed", value: completed },
  { color: "yellow", name: "On-Hold", value: onHold },
  { color: "red", name: "Dropped", value: dropped },
  { color: "white", name: "Plan to Read", value: planToRead },
];

const stats = [
  { name: "Total Manga", value: manga.value.length },
  { name: "Favourites", value: favourites },
  { name: "Total Chapters", value: totalChaptersSum },
  { name: "Read Chapters", value: readChaptersSum },
  { name: "Total Volumes", value: totalVolumesSum },
  { name: "Read Volumes", value: readVolumesSum },
];

const totalDays = round(
  (filteredMangaVolumes.value * 1) / 24 +
    (filteredWebtoonChapters.value * (1 / 12)) / 24 +
    (filteredLightNovelVolumes.value * 6) / 24,
  1
);
const meanScore =
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2);

onMounted(() => {
  // console.log("MANGA MOUNTED");
});
</script>
