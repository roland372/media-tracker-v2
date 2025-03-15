<template>
	<HeaderComponent title="Login">
		<div class="page-container d-flex align-center justify-center">
			<v-btn @click="signInWithGoogle">Sign in with google</v-btn>
		</div>
	</HeaderComponent>
</template>
<script setup lang="ts">
import { supabase } from '@/auth/supabaseClient';
import HeaderComponent from '@/components/media/HeaderComponent.vue';

const signInWithGoogle = async () => {
	await supabase.auth.signInWithOAuth({
		provider: 'google',
	});
};
</script>
<style scoped>
.page-container {
	min-height: 75vh;
}
</style>
