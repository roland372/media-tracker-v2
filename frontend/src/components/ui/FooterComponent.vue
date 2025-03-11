<template>
	<v-layout>
		<v-footer class="pa-3 bg-secondary-medium text-color footer-border"
			><p>© 2022 - {{ new Date().getFullYear() }} Media-Tracker</p></v-footer
		>
	</v-layout>
</template>
<style scoped>
.v-footer {
	bottom: 0;
	position: absolute;
	width: 100%;
	border-top: 3px solid var(--bg-secondary-light);
}
</style>
