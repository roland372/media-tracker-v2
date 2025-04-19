<template>
	<v-navigation-drawer
		class="nd-bg-color text-color rounded nav-drawer"
		expand-on-hover
		permanent
		rail
	>
		<v-list-item
			class="pa-2 title-item"
			:prepend-avatar="require('@/../public/img/icons/mstile-150x150.png')"
			title="Media-Tracker"
			to="/"
		>
		</v-list-item>

		<v-divider></v-divider>

		<v-list-item
			class="pa-2 profile-item"
			:prepend-avatar="user?.profileImg"
			:title="user?.username"
			to="/profile"
		>
			<template v-slot:subtitle>
				<div class="custom-subtitle">{{ user?.email }}</div>
			</template>
		</v-list-item>

		<v-divider></v-divider>

		<v-list density="compact">
			<v-list-item
				v-for="(link, index) in filteredLinks"
				:key="index"
				:color="link.color"
				height="20"
				min-height="35"
				:to="link.url"
			>
				<div class="d-flex align-center">
					<v-icon class="pe-1" :color="link.color">{{ link.icon }}</v-icon>
					<div class="ps-5">
						{{ link.text }}
					</div>
				</div>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>
<script setup lang="ts">
import { useUsersStore } from '@/stores/useUsersStore';
import { EUserRole } from '@/types';
import { navLinks } from '@/utils/links';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

const filteredLinks = computed(() =>
	navLinks
		.filter(link => {
			if (user.value?.role === EUserRole.ADMIN) {
				return link.route;
			} else {
				return link.route !== EUserRole.ADMIN;
			}
		})
		.slice(1)
);
</script>
<style scoped>
.nd-bg-color {
	background-color: var(--bg-secondary-medium);
	border-right: 3px solid var(--bg-secondary-light);
}
/* Fix avatar sizes */
:deep(.v-avatar) {
	height: 40px !important;
	min-height: 40px !important;
	width: 40px !important;
	min-width: 40px !important;
}

/* Fix icon sizes */
:deep(.v-icon) {
	height: 24px !important;
	width: 24px !important;
	font-size: 24px !important;
}

/* Fix profile item height */
:deep(.profile-item) {
	min-height: 56px !important;
	height: 56px !important;
	max-height: 56px !important;
	padding-top: 4px !important;
	padding-bottom: 4px !important;
}

/* Fix title spacing */
:deep(.profile-item .v-list-item__content) {
	padding-top: 0 !important;
	margin-top: 4px !important;
}

:deep(.profile-item .v-list-item__title) {
	line-height: 1.25 !important;
	margin-bottom: 4px !important;
}

.custom-subtitle {
	opacity: 0.7 !important;
	line-height: 1 !important;
	height: 16px !important;
	display: block !important;
	white-space: nowrap !important;
	overflow: hidden !important;
	text-overflow: ellipsis !important;
}
</style>
