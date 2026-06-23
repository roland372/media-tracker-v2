<template>
	<v-sheet class="filter-panel rounded-lg pa-2 mb-3" elevation="0">
		<div class="d-flex flex-row align-center ga-2 filter-panel__search-row">
			<v-text-field
				v-model="mediaSearch"
				@click:clear="handleSearchClear"
				@input="handleMediaSearch"
				clearable
				class="text-color filter-panel__search flex-grow-1"
				density="compact"
				hide-details="auto"
				:label="searchLabel"
				variant="outlined"
			/>
			<div class="d-flex align-center justify-end filter-panel__actions">
				<v-tooltip location="bottom" text="View & filter options">
					<template #activator="{ props: tooltipProps }">
						<span v-bind="tooltipProps">
							<ButtonIcon
								@click="handleOpenSettingsModal"
								button-size="small"
								color="grey-darken-3"
								icon="mdi-tune-variant"
								icon-size="18"
							/>
						</span>
					</template>
				</v-tooltip>
			</div>
		</div>

		<div class="my-3"></div>

		<div class="d-flex align-center flex-wrap ga-2">
			<ButtonText
				@click="handleFilterClear"
				:variant="selectedStatuses.length === 0 ? 'flat' : 'outlined'"
				color="deep-purple"
				size="default"
				:text="allMediaLabel"
			/>
			<ButtonText
				v-for="(status, index) in mediaStatus"
				@click="handleStatusClick(status.name)"
				:color="status.color"
				:key="index"
				size="default"
				:text="status.name"
				:variant="isStatusSelected(status.name) ? 'flat' : 'outlined'"
			/>
		</div>
	</v-sheet>
	<v-dialog
		v-if="settingsModal"
		v-model="settingsModal"
		:max-width="mediaType !== EMediaType.BOOK ? 520 : 480"
		><v-card>
			<div class="bg-primary-light text-color px-5 py-3 text-h6">
				View & filter options
			</div>
			<v-card-text class="ms-n1">
				<div class="mb-4">
					<strong class="d-block mb-2">View</strong>
					<div class="d-flex flex-wrap ga-2">
						<ButtonText
							@click="handleSetGridView"
							color="indigo"
							prepend-icon="mdi-view-grid"
							size="small"
							text="Grid"
							:variant="displayFlag === 'grid' ? 'flat' : 'outlined'"
						/>
						<ButtonText
							@click="handleSetTableView"
							color="indigo"
							prepend-icon="mdi-table"
							size="small"
							text="Table"
							:variant="displayFlag === 'table' ? 'flat' : 'outlined'"
						/>
					</div>
				</div>

				<v-divider class="mb-4 opacity-25" />

				<div class="d-sm-flex justify-space-between flex-wrap">
				<div>
					<strong> Sort by </strong>
					<v-radio-group v-model="sortingOptions.sortField" class="ms-n3">
						<div v-for="field in sortFields" :key="field.value">
							<v-radio :label="field.label" :value="field.value" />
						</div>
						<v-radio label="Created At" value="createdAt" />
						<v-radio label="Updated At" value="updatedAt" />
					</v-radio-group>
				</div>
				<div>
					<strong>Order</strong>
					<v-radio-group v-model="sortingOptions.sortOrder" class="ms-n3">
						<v-radio label="Ascending" value="asc" />
						<v-radio label="Descending" value="desc" />
					</v-radio-group>
				</div>
				<div class="me-2">
					<strong>Type</strong>
					<div class="mx-n3">
						<!-- Only show type filters when it's not a book -->
						<div v-if="mediaType !== EMediaType.BOOK">
							<v-checkbox
								v-for="(type, index) in mediaTypeValues"
								:key="type"
								v-model="mediaTypeFilter"
								@input="handleFilterTypeClick"
								:class="{ 'mt-n2': index === 0, 'mt-n9': index !== 0 }"
								:label="type"
								:value="type"
							/>
						</div>

						<!-- Always show the Favourites Filter for all media types, including books -->
						<v-select
							v-model="favouritesFilter"
							@update:modelValue="handleFavouriteFilter"
							:class="{
								'mt-n7 ml-2': mediaType !== EMediaType.BOOK,
								'mt-2 ml-2': mediaType === EMediaType.BOOK,
							}"
							density="compact"
							label="Favourites Filter"
							:items="[
								{ title: 'All', value: 'all' },
								{ title: 'Favourites', value: 'favourites' },
								{ title: 'Non-Favourites', value: 'non-favourites' },
							]"
							item-title="title"
							item-value="value"
							style="min-width: 150px"
						/>
					</div>
				</div>
				<div class="me-2 my-n4" style="min-width: 240px">
					<strong>Select Date Range</strong>
					<v-row class="mt-1 ms-n2" dense>
						<v-col cols="12" sm="6">
							<v-menu
								v-model="startMenu"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								max-width="320"
								min-width="240"
							>
								<template #activator="{ props }">
									<v-text-field
										v-bind="props"
										v-model="startInput"
										hide-details="auto"
										label="From"
										variant="outlined"
										density="compact"
										clearable
										style="min-width: 180px; max-width: 210px"
										@update:model-value="handleStartInput"
										@click:clear="handleStartInput('')"
									/>
								</template>
								<v-date-picker
									first-day-of-week="1"
									hide-header
									v-model="updatedAtRange.start"
									color="primary"
									@update:model-value="handleStartPickerMenu"
								/>
							</v-menu>
						</v-col>
						<v-col cols="12" sm="6">
							<v-menu
								v-model="endMenu"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								max-width="320"
								min-width="240"
							>
								<template #activator="{ props }">
									<v-text-field
										v-bind="props"
										v-model="endInput"
										hide-details="auto"
										label="To"
										variant="outlined"
										density="compact"
										clearable
										style="min-width: 180px; max-width: 210px"
										@update:model-value="handleEndInput"
										@click:clear="handleEndInput('')"
									/>
								</template>
								<v-date-picker
									first-day-of-week="1"
									hide-header
									v-model="updatedAtRange.end"
									color="primary"
									@update:model-value="handleEndPickerMenu"
								/>
							</v-menu>
						</v-col>
					</v-row>
				</div>
				</div>
			</v-card-text>
			<v-card-actions class="mx-2 mb-2 mt-0 justify-space-between">
				<ButtonText
					@click="handleResetAllFilters"
					color="red"
					prepend-icon="mdi-filter-off"
					size="small"
					text="Reset all filters"
					variant="text"
				/>
				<ButtonText
					@click="handleSortMedia"
					color="green"
					text="Confirm"
					variant="flat"
				/>
			</v-card-actions> </v-card
	></v-dialog>
</template>
<script setup lang="ts">
/* global defineEmits, defineProps */
import ButtonIcon from '@/components/ui/ButtonIcon.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import {
	TFavouritesFilter,
	useMediaFiltersStore,
} from '@/stores/useMediaFiltersStore';
import { EMediaType, TDateRange, TMediaStatus, TSortingOptions } from '@/types';
import { ComputedRef, computed, ref, watch } from 'vue';

interface IDisplayFilterSearchPanelProps {
	displayFlag: string;
	filterType?: string[];
	filterTypeOptions?: string[];
	searchTerm?: string;
	favouritesFilter?: TFavouritesFilter;
	sortingOptions?: TSortingOptions;
	mediaType: EMediaType;
	sortFields: Record<string, string>[];
	mediaStatus: {
		color: string;
		name: TMediaStatus;
		value: ComputedRef<number>;
	}[];
	selectedStatuses?: TMediaStatus[];
	updatedAtRange?: TDateRange;
}

const emit = defineEmits([
	'display',
	'search',
	'sort',
	'filter',
	'filterType',
	'filterFavourites',
	'filterUpdatedAtRange',
]);
const props = defineProps<IDisplayFilterSearchPanelProps>();
const filtersStore = useMediaFiltersStore();

const searchLabel = computed(() => {
	switch (props.mediaType) {
		case EMediaType.ANIME:
			return `Search for an ${props.mediaType} (t: title, s: series)`;
		case EMediaType.BOOK:
			return `Search for a ${props.mediaType} (t: title, a: author)`;
		case EMediaType.CHARACTER:
			return `Search for a ${props.mediaType} (n: name, s: series)`;
		case EMediaType.GAME:
			return `Search for a ${props.mediaType} (t: title, d: developer, s: series)`;
		case EMediaType.MANGA:
			return `Search for a ${props.mediaType} (t: title, a: author)`;
		case EMediaType.MOVIE:
			return `Search for a ${props.mediaType} (t: title)`;
		default:
			return `Search for a ${props.mediaType}`;
	}
});

const allMediaLabel = computed(() => {
	const pluralTypes = [
		EMediaType.BOOK,
		EMediaType.CHARACTER,
		EMediaType.GAME,
		EMediaType.MOVIE,
	];

	return pluralTypes.includes(props.mediaType)
		? `All ${props.mediaType}s`
		: `All ${props.mediaType}`;
});

const mediaSearch = ref<string>(props.searchTerm ?? '');
const settingsModal = ref<boolean>(false);
const sortingOptions = ref<TSortingOptions>(
	props.sortingOptions ?? getDefaultSortingOptions()
);
const mediaTypeValues = [
	...(props.filterTypeOptions ?? props.filterType ?? []),
];
const mediaTypeFilter = ref<string[]>([...(props.filterType ?? mediaTypeValues)]);
const selectedStatuses = ref<TMediaStatus[]>(props.selectedStatuses || []);
const updatedAtRange = ref<TDateRange>({
	start: props.updatedAtRange?.start ?? '',
	end: props.updatedAtRange?.end ?? '',
});
const startMenu = ref<boolean>(false);
const endMenu = ref<boolean>(false);

const favouritesFilter = ref<TFavouritesFilter>(
	props.favouritesFilter ?? 'all'
);

function getDefaultSortingOptions(): TSortingOptions {
	return {
		sortField: props.mediaType === EMediaType.CHARACTER ? 'name' : 'title',
		sortOrder: 'asc',
	};
}

function getResetDefaults() {
	return {
		sortField: getDefaultSortingOptions().sortField,
		typeFilter: mediaTypeValues.length ? [...mediaTypeValues] : undefined,
	};
}

// Format date from YYYY-MM-DD to DD/MM/YYYY for display
const formatDateDisplay = (dateValue: string | Date | undefined | null): string => {
	if (!dateValue) return '';
	
	// Convert to string if it's a Date object
	let dateString: string;
	if (dateValue instanceof Date) {
		const year = dateValue.getFullYear();
		const month = String(dateValue.getMonth() + 1).padStart(2, '0');
		const day = String(dateValue.getDate()).padStart(2, '0');
		return `${day}/${month}/${year}`;
	} else if (typeof dateValue === 'string') {
		dateString = dateValue;
	} else {
		return '';
	}
	
	// Parse YYYY-MM-DD format directly to avoid timezone issues
	const parts = dateString.split('-');
	if (parts.length !== 3) return dateString;
	const [year, month, day] = parts;
	return `${day}/${month}/${year}`;
};

const startInput = ref<string>(formatDateDisplay(updatedAtRange.value.start));
const endInput = ref<string>(formatDateDisplay(updatedAtRange.value.end));

// Parse user input (supports DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD) into ISO string
const parseDateInput = (value: string | null | undefined): string => {
	if (!value) return '';
	const trimmed = value.trim();
	if (!trimmed) return '';

	const normalized = trimmed.replace(/\./g, '/').replace(/-/g, '/');
	const parts = normalized.split('/');
	if (parts.length !== 3) return '';

	let day: string;
	let month: string;
	let year: string;

	// Detect format by checking first segment length
	if (parts[0].length === 4) {
		// YYYY/MM/DD
		[year, month, day] = parts;
	} else {
		// DD/MM/YYYY
		[day, month, year] = parts;
	}

	// Pad day/month
	day = day.padStart(2, '0');
	month = month.padStart(2, '0');

	const iso = `${year}-${month}-${day}`;
	const date = new Date(iso);
	if (isNaN(date.getTime())) return '';
	return iso;
};

const handleStartInput = (value: string | null | undefined) => {
	startInput.value = value || '';
	updatedAtRange.value.start = parseDateInput(value);
};

const handleEndInput = (value: string | null | undefined) => {
	endInput.value = value || '';
	updatedAtRange.value.end = parseDateInput(value);
};

const handleStartPicker = (value: string | Date) => {
	updatedAtRange.value.start = value as string;
	startInput.value = formatDateDisplay(value);
};

const handleEndPicker = (value: string | Date) => {
	updatedAtRange.value.end = value as string;
	endInput.value = formatDateDisplay(value);
};

const handleStartPickerMenu = (value: string | Date) => {
	handleStartPicker(value);
	startMenu.value = false;
};

const handleEndPickerMenu = (value: string | Date) => {
	handleEndPicker(value);
	endMenu.value = false;
};

// Check if a status is currently selected (highlighted/filled)
const isStatusSelected = (status: TMediaStatus): boolean => {
	// If no statuses are in the exclusion list, all are selected/filled
	if (selectedStatuses.value.length === 0) {
		return true;
	}

	// If we have exactly n-1 statuses in the list (where n is total number of statuses),
	// then we're in the "only one status selected" mode
	const allStatuses = props.mediaStatus.map(s => s.name);
	if (selectedStatuses.value.length === allStatuses.length - 1) {
		// In this case, the ONE status that is NOT in the exclusion list is selected/filled
		return !selectedStatuses.value.includes(status);
	}

	// For all other cases (multiple specific statuses selected),
	// those NOT in the exclusion list are selected/filled
	return !selectedStatuses.value.includes(status);
};

const handleFavouriteFilter = () => {
	emit('filterFavourites', favouritesFilter.value);
};

const handleSetGridView = () => {
	if (props.displayFlag !== 'grid') {
		emit('display');
	}
};

const handleSetTableView = () => {
	if (props.displayFlag !== 'table') {
		emit('display');
	}
};

const handleResetAllFilters = () => {
	const resetDefaults = getResetDefaults();

	filtersStore.resetFilters(props.mediaType, resetDefaults);

	mediaSearch.value = '';
	selectedStatuses.value = [];
	sortingOptions.value = getDefaultSortingOptions();
	mediaTypeFilter.value = [...mediaTypeValues];
	favouritesFilter.value = 'all';
	updatedAtRange.value = { start: '', end: '' };
	startInput.value = '';
	endInput.value = '';

	emit('search', '');
	emit('filter', []);
	emit('sort', sortingOptions.value);
	emit('filterType', mediaTypeFilter.value);
	emit('filterFavourites', 'all');
	emit('filterUpdatedAtRange', updatedAtRange.value);
};

const handleFilterClear = () => {
	// Get all available status names
	const allStatuses = props.mediaStatus.map(s => s.name);

	// Toggle between showing all (no filters) and showing none (all excluded)
	if (selectedStatuses.value.length === 0) {
		// Currently all statuses are active/visible - exclude all of them
		selectedStatuses.value = [...allStatuses];
	} else {
		// Some filters active - clear all filters to show everything
		selectedStatuses.value = [];
	}

	emit('filter', selectedStatuses.value);
};

const handleFilterTypeClick = () => emit('filterType', mediaTypeFilter.value);
const handleMediaSearch = () => emit('search', mediaSearch.value);
const handleOpenSettingsModal = () => {
	settingsModal.value = !settingsModal.value;
};
const handleSearchClear = () => emit('search', '');
const handleSortMedia = () => {
	emit('sort', sortingOptions.value);
	emit('filterType', mediaTypeFilter.value);
	emit('filterUpdatedAtRange', updatedAtRange.value);
	settingsModal.value = !settingsModal.value;
};

const handleStatusClick = (status: TMediaStatus) => {
	// Get all available status names
	const allStatuses = props.mediaStatus.map(s => s.name);

	// When all buttons are filled (no filters active)
	if (selectedStatuses.value.length === 0) {
		// When clicking a status, select only that one by excluding all others
		selectedStatuses.value = allStatuses.filter(s => s !== status);
	}
	// When one or more buttons are already selected
	else {
		// Check if we're in the special case where only a few are selected
		if (selectedStatuses.value.length >= allStatuses.length - 2) {
			// In this mode, the selected statuses are NOT in the list
			if (!selectedStatuses.value.includes(status)) {
				// Status is currently selected - deselect it by adding to exclusion list
				selectedStatuses.value.push(status);
			} else {
				// Status is currently not selected - select it by removing from exclusion list
				selectedStatuses.value = selectedStatuses.value.filter(
					s => s !== status
				);
			}
		}
		// In the other mode, selected statuses ARE in the list
		else {
			if (selectedStatuses.value.includes(status)) {
				// Status is currently selected - deselect it by removing from selection list
				selectedStatuses.value = selectedStatuses.value.filter(
					s => s !== status
				);
			} else {
				// Status is currently not selected - select it by adding to selection list
				selectedStatuses.value.push(status);
			}
		}

		// If all are now either selected or deselected, clear the list
		if (
			selectedStatuses.value.length === 0 ||
			selectedStatuses.value.length === allStatuses.length
		) {
			selectedStatuses.value = [];
		}
	}

	emit('filter', selectedStatuses.value);
};

watch(
	() => props.searchTerm,
	newSearchTerm => {
		mediaSearch.value = newSearchTerm ?? '';
	}
);

watch(
	() => props.selectedStatuses,
	newStatuses => {
		selectedStatuses.value = newStatuses ? [...newStatuses] : [];
	},
	{ deep: true }
);

watch(
	() => props.favouritesFilter,
	newFavouritesFilter => {
		if (newFavouritesFilter) {
			favouritesFilter.value = newFavouritesFilter;
		}
	}
);

watch(
	() => props.sortingOptions,
	newSortingOptions => {
		if (newSortingOptions) {
			sortingOptions.value = { ...newSortingOptions };
		}
	},
	{ deep: true }
);

watch(
	() => props.filterType,
	newFilterType => {
		if (newFilterType) {
			mediaTypeFilter.value = [...newFilterType];
		}
	},
	{ deep: true }
);

watch(
	() => props.updatedAtRange,
	newRange => {
		updatedAtRange.value = {
			start: newRange?.start ?? '',
			end: newRange?.end ?? '',
		};
		startInput.value = formatDateDisplay(updatedAtRange.value.start);
		endInput.value = formatDateDisplay(updatedAtRange.value.end);
	},
	{ deep: true }
);
</script>

<style scoped>
.filter-panel {
	background-color: rgba(255, 255, 255, 0.03);
	border: 1px solid rgba(255, 255, 255, 0.12);
}

.filter-panel__search {
	flex: 1 1 auto;
	min-width: 0;
}

.filter-panel__search :deep(.v-label),
.filter-panel__search :deep(.v-field-label) {
	font-size: 0.8125rem;
}

.filter-panel__actions {
	flex-shrink: 0;
}
</style>
