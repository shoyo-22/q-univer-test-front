<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import api from '@/shared/api/axiosInstance';
import { onMounted, ref } from 'vue';

const data = ref([]);

onMounted(async () => {
  data.value = await api.get('/courses');
  console.log(data);
});
</script>
