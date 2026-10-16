<template>
	<section class="bg-primary-dark page-container">
		<SnackbarComponent
			v-model="snackbar"
			:options="snackbarOptions"
			@action="onSnackbarAction"
		/>
		<v-alert
			v-if="!isAuthenticated"
			class="guest-banner text-center rounded-0 mb-0"
			color="warning"
			density="compact"
			:closable="false"
			variant="tonal"
		>
			You're viewing demo data. Sign in to access your full library.
			<router-link class="guest-banner__link ms-2" to="/login"
				>Sign in</router-link
			>
		</v-alert>
		<NavbarComponent v-if="!mdAndUp" />
		<v-layout>
			<NavigationDrawer v-if="mdAndUp" />
			<v-container class="text-center rounded ms-md-14" fluid>
				<router-view />
			</v-container>
		</v-layout>
		<FooterComponent class="mt-10 ms-md-14" />
		<ScrollToTopButton />
	</section>
</template>
<script setup lang="ts">
import { supabase } from '@/auth/supabaseClient';
import FooterComponent from '@/components/ui/FooterComponent.vue';
import NavbarComponent from '@/components/ui/NavbarComponent.vue';
import NavigationDrawer from '@/components/ui/NavigationDrawer.vue';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton.vue';
import SnackbarComponent from '@/components/ui/SnackbarComponent.vue';
import {
	IMediaDisplayControls,
	mediaDisplayControlsKey,
} from '@/composables/mediaDisplayControls';
import { useUsersStore } from '@/stores/useUsersStore';
import { useUtilsStore } from '@/stores/useUtilsStore';
import { storeToRefs } from 'pinia';
import { provide, ref } from 'vue';
import { useDisplay } from 'vuetify/lib/composables/display';

const usersStore = useUsersStore();
const utilsStore = useUtilsStore();
const { snackbar, snackbarOptions } = storeToRefs(utilsStore);
const { isAuthenticated } = storeToRefs(usersStore);

const collapseHandlers = new Set<() => void>();
const hasExpandedMedia = ref(false);
const mediaDisplayControls: IMediaDisplayControls = {
	hasExpandedMedia,
	collapseAll: () => {
		Array.from(collapseHandlers).forEach(collapse => collapse());
	},
	registerCollapseHandler: handler => {
		collapseHandlers.add(handler);
		hasExpandedMedia.value = true;
		return () => {
			collapseHandlers.delete(handler);
			hasExpandedMedia.value = collapseHandlers.size > 0;
		};
	},
};

provide(mediaDisplayControlsKey, mediaDisplayControls);

const onSnackbarAction = (actionId?: string) => {
	if (actionId === 'reconnect-google') {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					scope:
						'email profile openid https://www.googleapis.com/auth/spreadsheets',
				},
			},
		});
	}
};

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

.guest-banner__link {
	color: inherit;
	font-weight: 600;
	text-decoration: underline;
}
</style>
