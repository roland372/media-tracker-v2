import { EMediaType, TDateRange, TMediaStatus, TSortingOptions } from '@/types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export type TFavouritesFilter = 'all' | 'favourites' | 'non-favourites';

export type MediaFilters = {
	displayFlag: string;
	searchTerm: string;
	selectedStatuses: TMediaStatus[];
	sortingOptions: TSortingOptions;
	favouritesFilter: TFavouritesFilter;
	updatedAtRange: TDateRange;
	typeFilter: string[];
	allTypeOptions: string[];
};

export type MediaFiltersDefaults = {
	sortField?: string;
	typeFilter?: string[];
};

function createDefaultFilters(defaults: MediaFiltersDefaults = {}): MediaFilters {
	const allTypeOptions = defaults.typeFilter ? [...defaults.typeFilter] : [];

	return {
		displayFlag: 'grid',
		searchTerm: '',
		selectedStatuses: [],
		sortingOptions: {
			sortField: defaults.sortField ?? 'title',
			sortOrder: 'asc',
		},
		favouritesFilter: 'all',
		updatedAtRange: { start: '', end: '' },
		typeFilter: [...allTypeOptions],
		allTypeOptions,
	};
}

export const useMediaFiltersStore = defineStore('mediaFilters', () => {
	const filtersByType = reactive<Partial<Record<EMediaType, MediaFilters>>>({});

	function getFilters(
		mediaType: EMediaType,
		defaults: MediaFiltersDefaults = {}
	): MediaFilters {
		if (!filtersByType[mediaType]) {
			filtersByType[mediaType] = createDefaultFilters(defaults);
		}

		return filtersByType[mediaType] as MediaFilters;
	}

	function resetFilters(
		mediaType: EMediaType,
		defaults: MediaFiltersDefaults = {}
	): void {
		const fresh = createDefaultFilters(defaults);
		const existing = filtersByType[mediaType];

		if (existing) {
			Object.assign(existing, fresh);
		} else {
			filtersByType[mediaType] = fresh;
		}
	}

	return { getFilters, resetFilters };
});
