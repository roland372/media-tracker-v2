<template>
	<StatsComponent
		:media="EMediaType.CHARACTER"
		:media-type="EMediaType.CHARACTER"
		:progress="progress"
		:status="source"
		:stats="stats"
	/>
	<MediaTable
		v-if="displayFlag === 'table'"
		:media="filteredCharacters"
		:media-type="EMediaType.CHARACTER"
		title="All Characters"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleCharacterFilter"
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleCharacterFilterSource"
			@search="handleCharacterSearch"
			@sort="handleCharacterSort"
			:display-flag="displayFlag"
			:filter-type="characterSource"
			:media-status="source"
			:media-type="EMediaType.CHARACTER"
			:sort-fields="sortFields"
			:selected-statuses="characterSources"
		/>
	</MediaTable>
	<MediaComponent
		v-if="displayFlag === 'grid'"
		all-media
		:media="filteredCharacters"
		:media-type="EMediaType.CHARACTER"
		title="All Characters"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleCharacterFilter"
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleCharacterFilterSource"
			@search="handleCharacterSearch"
			@sort="handleCharacterSort"
			:display-flag="displayFlag"
			:filter-type="characterSource"
			:media-status="source"
			:media-type="EMediaType.CHARACTER"
			:sort-fields="sortFields"
			:selected-statuses="characterSources"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(characters, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.CHARACTER"
		title="Recent Characters"
	/>
	<MediaComponent
		:media-type="EMediaType.CHARACTER"
		:media="
			orderBy(
				filter(characters, { favourites: true }),
				[(character: TCharacter) => character.name.toLowerCase()],
				['asc']
			)
		"
		title="Favourite Characters"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useCharactersStore } from '@/stores/useCharactersStore';
import {
	ECharacterSource,
	EMediaType,
	TCharacter,
	TSortingOptions,
	TMediaStatus,
} from '@/types';
import {
	calculatePercentage,
	filterGameSource,
	getProgressItems,
	sortBy,
	advancedSearch,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const charactersStore = useCharactersStore();
const { characters } = storeToRefs(charactersStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const characterSources = ref<TMediaStatus[]>([]);
const characterSource = ref<string[]>([...Object.values(ECharacterSource)]);
const sortingOptions = ref<TSortingOptions>({
	sortField: 'name',
	sortOrder: 'asc',
});
const sortFields = [
	{
		label: 'Gender',
		value: 'gender',
	},
	{
		label: 'Hair Color',
		value: 'hairColor',
	},
	{
		label: 'Name',
		value: 'name',
	},
	{
		label: 'Series',
		value: 'series',
	},
	{
		label: 'Source',
		value: 'source',
	},
];

const favouritesFilter = ref<'all' | 'favourites' | 'non-favourites'>('all');
const handleFavouritesFilter = (
	filterValue: 'all' | 'favourites' | 'non-favourites'
) => {
	favouritesFilter.value = filterValue;
};

const favourites = computed(
	() =>
		filteredCharacters.value.filter(characters => characters.favourites).length
);

const filteredCharacters = computed(() => {
	if (characterSource.value.length === 0) {
		return [];
	}

	const flagConfigs: Array<{ field: keyof TCharacter; flag: string }> = [
		{ field: 'name', flag: 'n:' },
		{ field: 'series', flag: 's:' },
	];

	const additionalFilters = (el: TCharacter) => {
		const sourceMatch =
			characterSources.value.length === 0 ||
			!characterSources.value.includes(el.source as TMediaStatus);

		const sourceFilterMatch =
			characterSource.value.length === 0 ||
			characterSource.value.includes(el.source);

		const favouritesMatch =
			favouritesFilter.value === 'favourites'
				? el.favourites
				: favouritesFilter.value === 'non-favourites'
					? !el.favourites
					: true;

		return sourceMatch && sourceFilterMatch && favouritesMatch;
	};

	const filteredItems = advancedSearch(
		characters.value,
		searchTerm.value,
		flagConfigs,
		additionalFilters
	);

	const sortedCharacters = orderBy(
		filteredItems,
		[
			character =>
				sortBy(character, sortingOptions.value.sortField as keyof TCharacter),
		],
		[sortingOptions.value.sortOrder]
	);

	return sortedCharacters;
});

const totalCharacters = computed(() => filteredCharacters.value.length);
const anime = computed(
	() => filterGameSource(filteredCharacters, 'anime').length
);
const game = computed(
	() => filterGameSource(filteredCharacters, 'game').length
);
const manga = computed(
	() => filterGameSource(filteredCharacters, 'manga').length
);

const progress = computed(() =>
	getProgressItems(totalCharacters.value, [
		{
			color: 'green',
			value: calculatePercentage(anime.value, totalCharacters.value),
		},
		{
			color: 'blue',
			value: calculatePercentage(game.value, totalCharacters.value),
		},
		{
			color: 'yellow',
			value: calculatePercentage(manga.value, totalCharacters.value),
		},
	])
);

const source = computed(() => [
	{ color: 'green', name: ECharacterSource.ANIME, value: anime },
	{ color: 'blue', name: ECharacterSource.GAME, value: game },
	{ color: 'yellow', name: ECharacterSource.MANGA, value: manga },
]);

const stats = computed(() => [
	{ name: 'Total Characters', value: totalCharacters.value },
	{ name: 'Favourites', value: favourites },
]);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};

const handleCharacterFilter = (emittedValue: TMediaStatus[]) =>
	(characterSources.value = emittedValue);

const handleCharacterFilterSource = (emittedValue: string[]) =>
	(characterSource.value = emittedValue);

const handleCharacterSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleCharacterSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
</script>
