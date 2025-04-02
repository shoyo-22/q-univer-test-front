<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/entities/user/model/userStore';

const userStore = useUserStore();

onMounted(() => {
  userStore.checkAuth();
});
</script>
