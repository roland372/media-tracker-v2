<template>
  <HeaderComponent title="Books">
    <FormComponent
      v-if="formDialog"
      v-model="formDialog"
      @close="formDialog = !formDialog"
      @submit="handleSubmit"
      :media-type="EMediaType.BOOK"
      :title="`Add ${EMediaType.BOOK}`"
    />
    <SnackbarComponent v-model="snackbar" :text="snackbarText" />
    <section class="d-sm-flex align-center justify-center">
      <ButtonText
        @click="formDialog = !formDialog"
        color="indigo"
        text="Add Book"
      />
      <div class="px-3 text-color">
        <p>or</p>
      </div>
      <v-text-field
        v-model="bookFetchSearch"
        @click:append-inner="handleFetchBookSearch"
        append-inner-icon="mdi-magnify"
        class="text-color"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for a Book"
        variant="outlined"
      />
    </section>
  </HeaderComponent>
  <StatsComponent
    :mean-score="meanScore"
    :media-type="EMediaType.BOOK"
    :progress="progress"
    :status="status"
    :stats="stats"
    :total-days="totalDays"
  />
  <MediaTable
    v-if="displayFlag === 'table'"
    :media="filteredBooks"
    :media-type="EMediaType.BOOK"
    title="All Books"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleBookFilter"
      @search="handleBookSearch"
      @sort="handleBookSort"
      :display-flag="displayFlag"
      :media-type="EMediaType.BOOK"
    />
  </MediaTable>
  <MediaComponent
    v-if="displayFlag === 'grid'"
    all-media
    :media="filteredBooks"
    :media-type="EMediaType.BOOK"
    title="All Books"
  >
    <DisplayFilterSearchPanel
      @display="handleChangeDisplayFlag"
      @filter="handleBookFilter"
      @search="handleBookSearch"
      @sort="handleBookSort"
      :display-flag="displayFlag"
      :media-type="EMediaType.BOOK"
    />
  </MediaComponent>
  <MediaComponent
    :media="orderBy(books, ['updatedAt'], ['desc']).slice(0, 20)"
    :media-type="EMediaType.BOOK"
    title="Recent Books"
  />
  <MediaComponent
    :media-type="EMediaType.BOOK"
    :media="orderBy(filter(books, { favourites: true }), ['title'], ['asc'])"
    title="Favourite Books"
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
import { TSortingOptions } from "@/types";
import { EBookStatus, EMediaType } from "../../../common/types";

const mediaStore = useMediaStore();
const { books } = storeToRefs(mediaStore);

const displayFlag = ref<string>("grid");
const formDialog = ref<boolean>(false);
const searchTerm = ref<string>("");
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>(EMediaType.BOOK + " Added");
const bookFetchSearch = ref<string>("");
const bookFilter = ref<string>("");
const sortingOptions = ref<TSortingOptions>({
  sortField: "title",
  sortOrder: "asc",
});

const favourites = computed(
  () => books.value.filter((books) => books.favourites).length
);

const filteredBooks = computed(() => {
  const filteredItems = books.value.filter((el) => {
    const authorMarch = el.author
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    const titleMatch = el.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    const statusMatch =
      bookFilter.value === "" || el.status === bookFilter.value;
    return (authorMarch || titleMatch) && statusMatch;
  });

  const sortedBooks = orderBy(
    filteredItems,
    [sortingOptions.value.sortField],
    [sortingOptions.value.sortOrder]
  );

  return sortedBooks;
});

const filterZeroRating = computed(
  () => books.value.filter((books) => books.rating !== 0).length
);

const totalBooks = computed(() => books.value.length);
const totalDays = computed(() => round((totalPages.value * 1.5) / 24 / 24, 1));
const totalPages = computed(() =>
  books.value.reduce((accumulator, object) => {
    return accumulator + object.pages;
  }, 0)
);

const totalRating = computed(() =>
  books.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const meanScore = computed(() =>
  filterZeroRating.value === 0
    ? 0
    : round(totalRating.value / filterZeroRating.value, 2)
);

const reading = computed(() => filterMediaStatus(books, "reading").length);
const completed = computed(() => filterMediaStatus(books, "completed").length);
const onHold = computed(() => filterMediaStatus(books, "on-hold").length);
const dropped = computed(() => filterMediaStatus(books, "dropped").length);
const planToRead = computed(
  () => filterMediaStatus(books, "Plan to Read").length
);

const progress = computed(() => [
  {
    color: "green",
    value: calculatePercentage(reading.value, totalBooks.value),
  },
  {
    color: "blue",
    value: calculatePercentage(completed.value, totalBooks.value),
  },
  {
    color: "yellow",
    value: calculatePercentage(onHold.value, totalBooks.value),
  },
  {
    color: "red",
    value: calculatePercentage(dropped.value, totalBooks.value),
  },
  {
    color: "white",
    value: calculatePercentage(planToRead.value, totalBooks.value),
  },
]);

const status = computed(() => [
  { color: "green", name: EBookStatus.READING, value: reading },
  { color: "blue", name: EBookStatus.COMPLETED, value: completed },
  { color: "yellow", name: EBookStatus.ON_HOLD, value: onHold },
  { color: "red", name: EBookStatus.DROPPED, value: dropped },
  { color: "white", name: EBookStatus.PLAN_TO_READ, value: planToRead },
]);
const stats = computed(() => [
  { name: "Total Books", value: totalBooks.value },
  { name: "Favourites", value: favourites },
  { name: "Total Pages", value: totalPages.value },
]);

const handleBookFilter = (emittedValue: string) =>
  (bookFilter.value = emittedValue);

const handleBookSearch = (emittedValue: string) =>
  (searchTerm.value = emittedValue);

const handleBookSort = (emittedValue: TSortingOptions) =>
  (sortingOptions.value = emittedValue);

const handleChangeDisplayFlag = () => {
  if (displayFlag.value === "table") {
    displayFlag.value = "grid";
  } else if (displayFlag.value === "grid") {
    displayFlag.value = "table";
  }
};

const handleFetchBookSearch = () => {
  console.log(bookFetchSearch.value);
};

const handleSubmit = () => {
  formDialog.value = !formDialog.value;
  snackbar.value = true;
};
</script>
