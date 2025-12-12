<template>
	<section class="d-md-flex align-center justify-space-between mb-2">
		<div>
			<ButtonIcon
				@click="handleDisplayClick"
				color="indigo"
				:icon="displayFlag === 'table' ? 'mdi-view-grid' : 'mdi-table'"
				icon-size="25"
			/>
			<ButtonIcon
				@click="handleOpenSettingsModal"
				class="ms-2"
				color="grey-darken-3"
				icon="mdi-cog"
				icon-size="25"
			/>
		</div>
		<div class="d-flex align-center flex-wrap">
			<ButtonText
				@click="handleFilterClear"
				class="ma-1"
				:variant="selectedStatuses.length === 0 ? 'flat' : 'outlined'"
				color="deep-purple"
				:text="
					mediaType === EMediaType.BOOK ||
					mediaType === EMediaType.CHARACTER ||
					mediaType === EMediaType.GAME ||
					mediaType === EMediaType.MOVIE
						? `All ${mediaType}s`
						: `All ${mediaType}`
				"
			/>
			<ButtonText
				v-for="(status, index) in mediaStatus"
				@click="handleStatusClick(status.name)"
				class="ma-1"
				:color="status.color"
				:key="index"
				:text="status.name"
				:variant="isStatusSelected(status.name) ? 'flat' : 'outlined'"
			/>
		</div>
	</section>
	<section class="mb-3">
		<v-text-field
			v-model="mediaSearch"
			@click:clear="handleSearchClear"
			@input="handleMediaSearch"
			clearable
			class="text-color"
			density="compact"
			hide-details="auto"
			:label="`${
				mediaType === EMediaType.ANIME
					? `Search for an ${mediaType} (t: title, s: studio)`
					: mediaType === EMediaType.BOOK
					? `Search for a ${mediaType} (t: title, a: author)`
					: mediaType === EMediaType.CHARACTER
					? `Search for a ${mediaType} (n: name, s: series)`
					: mediaType === EMediaType.GAME
					? `Search for a ${mediaType} (t: title, d: developer)`
					: mediaType === EMediaType.MANGA
					? `Search for a ${mediaType} (t: title, a: author)`
					: mediaType === EMediaType.MOVIE
					? `Search for a ${mediaType} (t: title)`
					: `Search for a ${mediaType}`
			}`"
			variant="outlined"
		/>
	</section>
	<v-dialog
		v-if="settingsModal"
		v-model="settingsModal"
		:max-width="mediaType !== EMediaType.BOOK ? 500 : 450"
		><v-card>
			<div class="bg-primary-light text-color px-5 py-3 text-h6">
				Select sorting options
			</div>
			<v-card-text class="d-sm-flex justify-space-between ms-n1 flex-wrap">
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
			</v-card-text>
			<v-card-actions class="ms-2 mb-2 me-2 mt-0 justify-start">
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
import { EMediaType, TDateRange, TMediaStatus, TSortingOptions } from '@/types';
import { ComputedRef, ref, watch } from 'vue';

interface IDisplayFilterSearchPanelProps {
	displayFlag: string;
	filterType?: string[];
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

const mediaSearch = ref<string | undefined>('');
const settingsModal = ref<boolean>(false);
const sortingOptions = ref<TSortingOptions>({
	sortField: props.mediaType === EMediaType.CHARACTER ? 'name' : 'title',
	sortOrder: 'asc',
});
const mediaTypeFilter = ref<string[]>([...(props.filterType ?? [])]);
const mediaTypeValues = [...(props.filterType ?? [])];
const selectedStatuses = ref<TMediaStatus[]>(props.selectedStatuses || []);
const updatedAtRange = ref<TDateRange>({
	start: props.updatedAtRange?.start ?? '',
	end: props.updatedAtRange?.end ?? '',
});
const startMenu = ref<boolean>(false);
const endMenu = ref<boolean>(false);

const favouritesFilter = ref<'all' | 'favourites' | 'non-favourites'>('all');

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

const handleDisplayClick = () => {
	emit('display');
	emit('search', '');
	selectedStatuses.value = [];
	emit('filter', selectedStatuses.value);
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
