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
				color="primary"
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
				:variant="isStatusSelected(status.name) ? 'outlined' : 'flat'"
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
					? `Search for an ${mediaType}`
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
			<v-card-text class="d-sm-flex justify-space-between ms-n1">
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
								'mt-n7 ml-3': mediaType !== EMediaType.BOOK,
								'mt-2 ml-3': mediaType === EMediaType.BOOK,
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
							style="min-width: 140px"
						/>
					</div>
				</div>
			</v-card-text>
			<v-card-actions class="ms-2 mb-2 mt-n7">
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
import ButtonIcon from '@/components/ui/ButtonIcon.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import { EMediaType, TMediaStatus, TSortingOptions } from '@/types';
import { ComputedRef, defineEmits, defineProps, ref } from 'vue';

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
}

const emit = defineEmits([
	'display',
	'search',
	'sort',
	'filter',
	'filterType',
	'filterFavourites',
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

const favouritesFilter = ref<'all' | 'favourites' | 'non-favourites'>('all');

// Check if a status is currently selected
const isStatusSelected = (status: TMediaStatus): boolean => {
	return selectedStatuses.value.includes(status);
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
	// If no filters are currently selected (All is active), select all statuses (exclude all)
	if (selectedStatuses.value.length === 0) {
		// Get all status names and select them all (which will exclude all items)
		selectedStatuses.value = props.mediaStatus.map(status => status.name);
	} else {
		// Otherwise, clear all selected statuses (show all items)
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
	settingsModal.value = !settingsModal.value;
};

const handleStatusClick = (status: TMediaStatus) => {
	// If nothing is selected (or "All" is active), clicking a status should exclude only that status
	if (selectedStatuses.value.length === 0) {
		// Add only the clicked status to the filter (exclude just this one)
		selectedStatuses.value = [status];
	} else {
		const index = selectedStatuses.value.indexOf(status);
		if (index === -1) {
			// Add status to selection (adding this status to be excluded)
			selectedStatuses.value.push(status);
		} else {
			// Remove status from selection (removing this status from exclusion)
			selectedStatuses.value.splice(index, 1);
			// If no statuses are now selected, clear the filter completely
			if (selectedStatuses.value.length === 0) {
				selectedStatuses.value = [];
			}
		}
	}
	emit('filter', selectedStatuses.value);
};
</script>
