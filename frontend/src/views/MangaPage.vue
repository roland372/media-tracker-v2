<template>
	<StatsComponent
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
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleMangaFilterType"
			@search="handleMangaSearch"
			@sort="handleMangaSort"
			:display-flag="displayFlag"
			:filter-type="mangaType"
			:media-status="status"
			:media-type="EMediaType.MANGA"
			:sort-fields="sortFields"
			:selected-statuses="mangaStatuses"
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
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleMangaFilterType"
			@search="handleMangaSearch"
			@sort="handleMangaSort"
			:display-flag="displayFlag"
			:filter-type="mangaType"
			:media-status="status"
			:media-type="EMediaType.MANGA"
			:sort-fields="sortFields"
			:selected-statuses="mangaStatuses"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(manga, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.MANGA"
		title="Recent Manga"
	/>
	<MediaComponent
		:media-type="EMediaType.MANGA"
		:media="
			orderBy(
				filter(manga, { favourites: true }),
				[manga => manga.title.toLowerCase()],
				['asc']
			)
		"
		title="Favourite Manga"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useMangaStore } from '@/stores/useMangaStore';
import {
	EMangaStatus,
	EMangaType,
	EMediaType,
	TManga,
	TSortingOptions,
	TMediaStatus,
} from '@/types';
import {
	calculatePercentage,
	filterMediaStatus,
	getProgressItems,
	round,
	sortBy,
	advancedSearch,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const mangaStore = useMangaStore();
const { manga } = storeToRefs(mangaStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const mangaStatuses = ref<TMediaStatus[]>([]);
const mangaType = ref<string[]>([...Object.values(EMangaType)]);
const sortingOptions = ref<TSortingOptions>({
	sortField: 'title',
	sortOrder: 'asc',
});
const sortFields = [
	{
		label: 'Chapters',
		value: 'chaptersMin',
	},
	{
		label: 'Status',
		value: 'status',
	},
	{
		label: 'Title',
		value: 'title',
	},
	{
		label: 'Type',
		value: 'type',
	},
	{
		label: 'Volumes',
		value: 'volumesMin',
	},
];

const favouritesFilter = ref<'all' | 'favourites' | 'non-favourites'>('all');
const handleFavouritesFilter = (
	filterValue: 'all' | 'favourites' | 'non-favourites'
) => {
	favouritesFilter.value = filterValue;
};

const favourites = computed(
	() => filteredManga.value.filter(manga => manga.favourites).length
);

const filteredManga = computed(() => {
	if (mangaType.value.length === 0) {
		return [];
	}

	const flagConfigs: Array<{ field: keyof TManga; flag: string }> = [
		{ field: 'title', flag: 't:' },
		{ field: 'author', flag: 'a:' }
	];

	const additionalFilters = (el: TManga) => {
		const statusMatch =
			mangaStatuses.value.length === 0 || !mangaStatuses.value.includes(el.status as TMediaStatus);

		const typeMatch =
			mangaType.value.length === 0 || mangaType.value.includes(el.type);

		const favouritesMatch =
			favouritesFilter.value === 'favourites'
				? el.favourites
				: favouritesFilter.value === 'non-favourites'
				? !el.favourites
				: true;

		return statusMatch && typeMatch && favouritesMatch;
	};

	const filteredItems = advancedSearch(
		manga.value, 
		searchTerm.value,
		flagConfigs,
		additionalFilters
	);

	const sortedManga = orderBy(
		filteredItems,
		[manga => sortBy(manga, sortingOptions.value.sortField as keyof TManga)],
		[sortingOptions.value.sortOrder]
	);

	return sortedManga;
});

const filteredMangaVolumes = computed(() =>
	filteredManga.value
		.filter(manga => manga.type === 'Manga')
		.reduce((accumulator, object) => {
			return accumulator + object.volumesMin;
		}, 0)
);

const filteredLightNovelVolumes = computed(() =>
	filteredManga.value
		.filter(manga => manga.type === 'Light Novel')
		.reduce((accumulator, object) => {
			return accumulator + object.volumesMin;
		}, 0)
);

const filteredWebtoonChapters = computed(() =>
	filteredManga.value
		.filter(manga => manga.type === 'Webtoon')
		.reduce((accumulator, object) => {
			return accumulator + object.chaptersMin;
		}, 0)
);

const readChaptersSum = computed(() =>
	filteredManga.value.reduce(
		(accumulator, object) => accumulator + object.chaptersMin,
		0
	)
);

const readVolumesSum = computed(() =>
	filteredManga.value.reduce(
		(accumulator, object) => accumulator + object.volumesMin,
		0
	)
);

const totalChaptersSum = computed(() =>
	filteredManga.value.reduce(
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

const totalManga = computed(() => filteredManga.value.length);

const totalVolumesSum = computed(() =>
	filteredManga.value.reduce(
		(accumulator, object) => accumulator + object.volumesMax,
		0
	)
);

const reading = computed(
	() => filterMediaStatus(filteredManga, 'reading').length
);
const completed = computed(
	() => filterMediaStatus(filteredManga, 'completed').length
);
const onHold = computed(
	() => filterMediaStatus(filteredManga, 'on-hold').length
);
const dropped = computed(
	() => filterMediaStatus(filteredManga, 'dropped').length
);
const planToRead = computed(
	() => filterMediaStatus(filteredManga, 'Plan to Read').length
);

const progress = computed(() =>
	getProgressItems(totalManga.value, [
		{
			color: 'green',
			value: calculatePercentage(reading.value, totalManga.value),
		},
		{
			color: 'blue',
			value: calculatePercentage(completed.value, totalManga.value),
		},
		{
			color: 'yellow',
			value: calculatePercentage(onHold.value, totalManga.value),
		},
		{
			color: 'red',
			value: calculatePercentage(dropped.value, totalManga.value),
		},
		{
			color: 'white',
			value: calculatePercentage(planToRead.value, totalManga.value),
		},
	])
);

const status = computed(() => [
	{ color: 'green', name: EMangaStatus.READING, value: reading },
	{ color: 'blue', name: EMangaStatus.COMPLETED, value: completed },
	{ color: 'yellow', name: EMangaStatus.ON_HOLD, value: onHold },
	{ color: 'red', name: EMangaStatus.DROPPED, value: dropped },
	{ color: 'white', name: EMangaStatus.PLAN_TO_READ, value: planToRead },
]);

const stats = computed(() => [
	{ name: 'Total Manga', value: totalManga.value },
	{ name: 'Favourites', value: favourites },
	{ name: 'Total Chapters', value: totalChaptersSum },
	{ name: 'Read Chapters', value: readChaptersSum },
	{ name: 'Total Volumes', value: totalVolumesSum },
	{ name: 'Read Volumes', value: readVolumesSum },
]);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};

const handleMangaFilter = (emittedValue: TMediaStatus[]) =>
	(mangaStatuses.value = emittedValue);

const handleMangaFilterType = (emittedValue: string[]) =>
	(mangaType.value = emittedValue);

const handleMangaSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleMangaSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
</script>
