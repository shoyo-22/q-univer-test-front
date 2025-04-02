<script setup lang="ts">
const props = defineProps({
  id: String,
});

import { api } from '@/shared/api/base';
import { onMounted, ref } from 'vue';
import type { Course } from '../root-page/index.vue';
import { BaseContainer } from '@/shared/ui';

const course = ref<Course | null>(null);
const isLoading = ref<boolean>(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await api.get(`/courses/${props.id}`);
    course.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <BaseContainer>
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <article
        class="rounded-2xl border border-gray-300 shadow-md transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
      >
        <img :src="course?.thumbnailUrl" :alt="course?.title" class="object-fit rounded-2xl" />
        <div class="space-y-2 p-3">
          <h3 class="text-base font-semibold">{{ course?.title }}</h3>
          <p class="line-clamp-3 text-sm">{{ course?.imageUrl }}</p>
        </div>
      </article>
    </div>
  </BaseContainer>
</template>
