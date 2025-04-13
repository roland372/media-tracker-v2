<template>
	<CardComponent :title="`${mediaType} Stats`">
		<section class="text-color mb-1 mt-3">
			<div class="stacked-progress-container">
				<div
					v-for="(item, index) in progress"
					:key="index"
					class="stacked-progress-segment"
					:class="{ 'text-black': item.color === 'white' }"
					:style="{
						width: `${item.value}%`,
						backgroundColor: getColorValue(item.color),
						left: `${getSegmentOffset(index)}%`,
					}"
				>
					<span v-if="item.value >= 4" class="progress-label">
						{{ Math.ceil(item.value) }}%
					</span>
				</div>
			</div>

			<div class="d-flex flex-wrap mt-3 mb-n6" :class="{'mobile-margin-bottom': $vuetify.display.xs}">
				<div
					v-for="(item, index) in progress"
					:key="`legend-${index}`"
					class="me-3 mb-2 d-flex align-center"
					v-show="item.value > 0"
				>
					<div
						class="legend-color me-1"
						:style="{ backgroundColor: getColorValue(item.color) }"
					></div>
					<div>{{ getStatusNameForColor(item.color) }} ({{
						Math.ceil(item.value)
					}}%)</div>
				</div>
			</div>
		</section>

		<section v-if="mediaType !== EMediaType.CHARACTER" class="text-color mb-n3" :class="{'mobile-margin-top': $vuetify.display.xs}">
			<br />
			<section class="d-flex justify-space-between">
				<div><b>Days:</b> {{ totalDays }}</div>
			</section>
		</section>
		<br />
		<section class="d-sm-flex justify-space-between text-color mb-n1" :class="{'mobile-margin-top': $vuetify.display.xs}">
			<section class="text-start mb-3 mb-xs-0">
				<div
					v-for="(item, index) in status"
					:key="index"
					class="d-flex align-center justify-space-between"
				>
					<div class="d-flex align-center">
						<v-icon :color="item.color" icon="mdi-circle" />
						<div class="ms-2">
							<b>{{ item.name }}</b>
						</div>
					</div>
					<span class="ms-4">{{ item.value }}</span>
				</div>
			</section>

			<section class="d-flex flex-column">
				<div
					v-for="(item, index) in stats"
					:key="index"
					class="d-flex justify-space-between"
				>
					<div>
						<b>{{ item.name }}</b>
					</div>
					<div class="ms-4">{{ item.value }}</div>
				</div>
			</section>
		</section>
	</CardComponent>
</template>
<script setup lang="ts">
import CardComponent from '@/components/media/CardComponent.vue';
import { EMediaType } from '@/types';
import { defineProps, Ref } from 'vue';

interface IStatsComponentProps {
	mediaType: EMediaType;
	progress: { color: string; value: number }[];
	status: { color: string; name: string; value: Ref<number> }[];
	stats: { name: string; value: Ref<number> | number | string | null }[];
	totalDays?: number;
}

const props = defineProps<IStatsComponentProps>();

const getColorValue = (color: string): string => {
	const colorMap: Record<string, string> = {
		green: '#4CAF50',
		blue: '#2196F3',
		yellow: '#FFC107',
		red: '#F44336',
		white: '#FFFFFF',
	};
	return colorMap[color] || color;
};

const getSegmentOffset = (index: number): number => {
	let offset = 0;
	for (let i = 0; i < index; i++) {
		offset += props.progress[i].value || 0;
	}
	return offset;
};

const getStatusNameForColor = (color: string): string => {
	const statusItem = props.status.find(item => item.color === color);
	return statusItem ? statusItem.name : '';
};
</script>

<style scoped>
.stacked-progress-container {
	position: relative;
	height: 30px;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 6px;
	overflow: hidden;
}

.stacked-progress-segment {
	position: absolute;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	transition: width 0.3s ease, box-shadow 0.3s ease;
	min-width: 1px;
}

.progress-label {
	white-space: nowrap;
	font-size: 0.9rem;
	text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

.legend-color {
	width: 18px;
	height: 18px;
	border-radius: 3px;
}

/* Add styles to specifically target mobile screens */
@media (max-width: 600px) {
	.progress-label {
		display: none;
	}
	
	/* Add these classes for mobile-specific margin adjustments */
	.mobile-margin-bottom {
		margin-bottom: -20px !important;
	}
	
	.mobile-margin-top {
		margin-top: 2px !important;
	}
}
</style>
