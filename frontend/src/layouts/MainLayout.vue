<template>
	<section class="bg-primary-dark page-container">
		<SnackbarComponent v-model="snackbar" :options="snackbarOptions" />
		<NavbarComponent v-if="user && !mdAndUp" />
		<v-layout>
			<NavigationDrawer v-if="user && mdAndUp" />
			<v-container
				class="text-center rounded"
				:class="{ 'ms-md-14': user }"
				fluid
			>
				<router-view />
			</v-container>
		</v-layout>
		<FooterComponent class="mt-10" :class="{ 'ms-md-14': user }" />
		<ScrollToTopButton />
	</section>
</template>
<script setup lang="ts">
import FooterComponent from '@/components/ui/FooterComponent.vue';
import NavbarComponent from '@/components/ui/NavbarComponent.vue';
import NavigationDrawer from '@/components/ui/NavigationDrawer.vue';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton.vue';
import SnackbarComponent from '@/components/ui/SnackbarComponent.vue';
import { useUsersStore } from '@/stores/useUsersStore';
import { useUtilsStore } from '@/stores/useUtilsStore';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';

const usersStore = useUsersStore();
const utilsStore = useUtilsStore();
const { snackbar, snackbarOptions } = storeToRefs(utilsStore);
const { user } = storeToRefs(usersStore);

const {
	mdAndUp,
	// lgAndUp,
} = useDisplay();
</script>
<style scoped>
.page-container {
	min-height: 100vh;
	position: relative;
}
</style>
