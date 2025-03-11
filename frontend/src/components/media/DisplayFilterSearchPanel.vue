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
		:max-width="mediaType !== EMediaType.BOOK ? 500 : 300"
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
				<div v-if="mediaType !== EMediaType.BOOK" class="me-2">
					<strong>Type</strong>
					<div class="mx-n3">
						<!-- <v-checkbox
              v-model="mediaTypeFilter"
              @input="handleFilterTypeClick"
              class="mt-n2"
              label="Game"
              value="Game"
            />
            <v-checkbox
              v-model="mediaTypeFilter"
              @input="handleFilterTypeClick"
              class="mt-n9"
              label="Visual Novel"
              value="Visual Novel"
            /> -->
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
}

const emit = defineEmits(['display', 'search', 'sort', 'filter', 'filterType']);
const props = defineProps<IDisplayFilterSearchPanelProps>();

const mediaSearch = ref<string | undefined>('');
const settingsModal = ref<boolean>(false);
const sortingOptions = ref<TSortingOptions>({
	sortField: props.mediaType === EMediaType.CHARACTER ? 'name' : 'title',
	sortOrder: 'asc',
});
const mediaTypeFilter = ref<string[]>([...(props.filterType ?? [])]);
const mediaTypeValues = [...(props.filterType ?? [])];

const handleDisplayClick = () => {
	emit('display');
	emit('search', '');
	emit('filter', '');
};

const handleFilterClear = () => emit('filter', '');
const handleFilterTypeClick = () => emit('filterType', mediaTypeFilter.value);
const handleMediaSearch = () => emit('search', mediaSearch.value);
const handleOpenSettingsModal = () => {
	settingsModal.value = !settingsModal.value;
};
const handleSearchClear = () => emit('search', '');
const handleSortMedia = () => {
	emit('sort', sortingOptions.value);
	// console.log("Sort By:", sortingOptions.value.sortField);
	// console.log("Sort Order:", sortingOptions.value.sortOrder);
	emit('filterType', mediaTypeFilter.value);
	settingsModal.value = !settingsModal.value;
};
const handleStatusClick = (status: TMediaStatus) => emit('filter', status);
</script>
