<template>
	<CardComponent :title="title">
		<slot></slot>
		<h3 v-if="!media.length" class="text-color">Not found any items.</h3>
		<section v-else class="grid-container">
			<section
				v-for="(image, index) in media.slice(
					0,
					allMedia ? displayMediaFlag : props.media.length
				)"
				:key="index"
				class="d-flex align-center justify-center"
			>
				<MediaCard
					class="media-img-card"
					:media="image"
					:media-type="mediaType"
				/>
			</section>
		</section>
		<ButtonText
			v-if="allMedia && media.length > 20"
			@click="displayMedia"
			:append-icon="
				displayMediaFlag === 20 ? 'mdi-arrow-down-bold' : 'mdi-arrow-up-bold'
			"
			class="mt-3"
			color="indigo"
			:text="displayMediaFlag === 20 ? 'Display All' : 'Display Less'"
		/>
	</CardComponent>
</template>
<script setup lang="ts">
import CardComponent from '@/components/media/CardComponent.vue';
import MediaCard from '@/components/media/MediaCard.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import { EMediaType, TMedia } from '@/types';
import { defineProps, ref, withDefaults } from 'vue';

interface IMediaComponentProps {
	allMedia?: boolean;
	media: TMedia[];
	mediaType: EMediaType;
	title: string;
}

const props = withDefaults(defineProps<IMediaComponentProps>(), {
	allMedia: false,
});

const displayMediaFlag = ref<number>(20);

const displayMedia = () => {
	displayMediaFlag.value === 20
		? (displayMediaFlag.value = props.media.length)
		: (displayMediaFlag.value = 20);
};
</script>
<style scoped>
.media-img-card {
	height: 275px;
}

.grid-container {
	display: grid;
	grid-template-columns: repeat(16, auto);
	grid-gap: 10px;
}

.image-hover {
	cursor: pointer;
}

@media (max-width: 3250px) {
	.media-img-card {
		height: 275px;
	}

	.grid-container {
		grid-template-columns: repeat(14, auto);
	}
}

@media (max-width: 2800px) {
	.media-img-card {
		height: 320px;
	}

	.grid-container {
		grid-template-columns: repeat(13, auto);
	}
}

@media (max-width: 2560px) {
	.media-img-card {
		height: 320px;
	}

	.grid-container {
		grid-template-columns: repeat(12, auto);
	}
}

@media (max-width: 2550px) {
	.media-img-card {
		height: 250px;
	}

	.grid-container {
		grid-template-columns: repeat(12, auto);
	}
}

@media (max-width: 1920px) {
	.media-img-card {
		height: 200px;
	}

	.grid-container {
		grid-template-columns: repeat(11, auto);
	}
}

@media (max-width: 1700px) {
	.media-img-card {
		height: 200px;
	}

	.grid-container {
		grid-template-columns: repeat(10, auto);
	}
}

@media (max-width: 1440px) {
	.media-img-card {
		height: 200px;
	}

	.grid-container {
		grid-template-columns: repeat(9, auto);
	}
}

@media (max-width: 1280px) {
	.media-img-card {
		height: 165px;
	}

	.grid-container {
		grid-template-columns: repeat(8, auto);
	}
}

@media (max-width: 1024px) {
	.media-img-card {
		height: 165px;
	}

	.grid-container {
		grid-template-columns: repeat(8, auto);
	}
}

@media (max-width: 960px) {
	.media-img-card {
		height: 200px;
	}

	.grid-container {
		grid-template-columns: repeat(6, auto);
	}
}

@media (max-width: 880px) {
	.media-img-card {
		height: 230px;
	}

	.grid-container {
		grid-template-columns: repeat(5, auto);
	}
}

@media (max-width: 768px) {
	.media-img-card {
		height: 200px;
	}

	.grid-container {
		grid-template-columns: repeat(5, auto);
	}
}

@media (max-width: 700px) {
	.media-img-card {
		height: 220px;
	}

	.grid-container {
		grid-template-columns: repeat(4, auto);
	}
}

@media (max-width: 630px) {
	.media-img-card {
		height: 200px;
	}

	.grid-container {
		grid-template-columns: repeat(4, auto);
	}
}

@media (max-width: 580px) {
	.media-img-card {
		height: 180px;
	}

	.grid-container {
		grid-template-columns: repeat(4, auto);
	}
}

@media (max-width: 500px) {
	.media-img-card {
		height: 175px;
	}

	.grid-container {
		grid-template-columns: repeat(3, auto);
	}
}

@media (max-width: 425px) {
	.media-img-card {
		height: 145px;
	}

	.grid-container {
		grid-template-columns: repeat(3, auto);
	}
}

@media (max-width: 375px) {
	.media-img-card {
		height: 140px;
	}

	.grid-container {
		grid-template-columns: repeat(3, auto);
	}
}
</style>
