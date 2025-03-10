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
			@filter-type="handleCharacterFilterSource"
			@search="handleCharacterSearch"
			@sort="handleCharacterSort"
			:display-flag="displayFlag"
			:filter-type="characterSource"
			:media-status="source"
			:media-type="EMediaType.CHARACTER"
			:sort-fields="sortFields"
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
			@filter-type="handleCharacterFilterSource"
			@search="handleCharacterSearch"
			@sort="handleCharacterSort"
			:display-flag="displayFlag"
			:filter-type="characterSource"
			:media-status="source"
			:media-type="EMediaType.CHARACTER"
			:sort-fields="sortFields"
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
			orderBy(filter(characters, { favourites: true }), ['name'], ['asc'])
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
import { ECharacterSource, EMediaType, TSortingOptions } from '@/types';
import { calculatePercentage, filterGameSource } from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const charactersStore = useCharactersStore();
const { characters } = storeToRefs(charactersStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const characterFilter = ref<string>('');
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

const favourites = computed(
	() => characters.value.filter(characters => characters.favourites).length
);

const filteredCharacters = computed(() => {
	if (characterSource.value.length === 0) {
		return [];
	}

	const filteredItems = characters.value.filter(el => {
		const searchTermMatch =
			el.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
			el.series
				.toString()
				.toLowerCase()
				.includes(searchTerm.value.toLowerCase());

		const sourceMatch =
			characterFilter.value === '' || el.source === characterFilter.value;

		const sourceFilterMatch =
			characterSource.value.length === 0 ||
			characterSource.value.includes(el.source);

		return searchTermMatch && sourceMatch && sourceFilterMatch;
	});

	const sortedCharacters = orderBy(
		filteredItems,
		[sortingOptions.value.sortField],
		[sortingOptions.value.sortOrder]
	);

	return sortedCharacters;
});

const totalCharacters = computed(() => characters.value.length);
const anime = computed(() => filterGameSource(characters, 'anime').length);
const game = computed(() => filterGameSource(characters, 'game').length);
const manga = computed(() => filterGameSource(characters, 'manga').length);
const progress = computed(() => [
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
]);

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

const handleCharacterFilter = (emittedValue: string) =>
	(characterFilter.value = emittedValue);

const handleCharacterFilterSource = (emittedValue: string[]) =>
	(characterSource.value = emittedValue);

const handleCharacterSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleCharacterSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
</script>
