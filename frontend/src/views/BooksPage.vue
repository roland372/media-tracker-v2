<template>
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
			:media-status="status"
			:media-type="EMediaType.BOOK"
			:sort-fields="sortFields"
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
			:media-status="status"
			:media-type="EMediaType.BOOK"
			:sort-fields="sortFields"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(books, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.BOOK"
		title="Recent Books"
	/>
	<MediaComponent
		:media-type="EMediaType.BOOK"
		:media="
			orderBy(
				filter(books, { favourites: true }),
				[book => book.title.toLowerCase()],
				['asc']
			)
		"
		title="Favourite Books"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useBooksStore } from '@/stores/useBooksStore';
import { EBookStatus, EMediaType, TBook, TSortingOptions } from '@/types';
import {
	calculatePercentage,
	filterMediaStatus,
	round,
	sortBy,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const booksStore = useBooksStore();
const { books } = storeToRefs(booksStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const bookFilter = ref<string>('');
const sortingOptions = ref<TSortingOptions>({
	sortField: 'title',
	sortOrder: 'asc',
});
const sortFields = [
	{
		label: 'Author',
		value: 'author',
	},
	{
		label: 'Genre',
		value: 'genre',
	},
	{
		label: 'Pages',
		value: 'pages',
	},
	{
		label: 'Rating',
		value: 'rating',
	},
	{
		label: 'Status',
		value: 'status',
	},
	{
		label: 'Title',
		value: 'title',
	},
];

const favourites = computed(
	() => books.value.filter(books => books.favourites).length
);

const filteredBooks = computed(() => {
	const filteredItems = books.value.filter(el => {
		const authorMarch = el.author
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase());

		const titleMatch = el.title
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase());

		const statusMatch =
			bookFilter.value === '' || el.status === bookFilter.value;
		return (authorMarch || titleMatch) && statusMatch;
	});

	const sortedBooks = orderBy(
		filteredItems,
		[book => sortBy(book, sortingOptions.value.sortField as keyof TBook)],
		[sortingOptions.value.sortOrder]
	);

	return sortedBooks;
});

const filterZeroRating = computed(
	() => books.value.filter(books => books.rating !== 0).length
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

const reading = computed(() => filterMediaStatus(books, 'reading').length);
const completed = computed(() => filterMediaStatus(books, 'completed').length);
const onHold = computed(() => filterMediaStatus(books, 'on-hold').length);
const dropped = computed(() => filterMediaStatus(books, 'dropped').length);
const planToRead = computed(
	() => filterMediaStatus(books, 'Plan to Read').length
);

const progress = computed(() => [
	{
		color: 'green',
		value: calculatePercentage(reading.value, totalBooks.value),
	},
	{
		color: 'blue',
		value: calculatePercentage(completed.value, totalBooks.value),
	},
	{
		color: 'yellow',
		value: calculatePercentage(onHold.value, totalBooks.value),
	},
	{
		color: 'red',
		value: calculatePercentage(dropped.value, totalBooks.value),
	},
	{
		color: 'white',
		value: calculatePercentage(planToRead.value, totalBooks.value),
	},
]);

const status = computed(() => [
	{ color: 'green', name: EBookStatus.READING, value: reading },
	{ color: 'blue', name: EBookStatus.COMPLETED, value: completed },
	{ color: 'yellow', name: EBookStatus.ON_HOLD, value: onHold },
	{ color: 'red', name: EBookStatus.DROPPED, value: dropped },
	{ color: 'white', name: EBookStatus.PLAN_TO_READ, value: planToRead },
]);
const stats = computed(() => [
	{ name: 'Total Books', value: totalBooks.value },
	{ name: 'Favourites', value: favourites },
	{ name: 'Total Pages', value: totalPages.value },
]);

const handleBookFilter = (emittedValue: string) =>
	(bookFilter.value = emittedValue);

const handleBookSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleBookSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};
</script>
