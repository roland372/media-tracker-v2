<template>
	<CardComponent :title="title">
		<slot></slot>
	</CardComponent>
</template>
<script setup lang="ts">
import CardComponent from '@/components/media/CardComponent.vue';
import { defineProps } from 'vue';

interface IHeaderComponent {
	title: string;
}

defineProps<IHeaderComponent>();
</script>
